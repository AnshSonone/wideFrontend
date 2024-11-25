"use client"
import React, { useState, useEffect, } from "react"
import Link from "next/link"
import axios from "axios"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/hooks"

const Login = () => {

    const router = useRouter()

    const dispatch = useAppDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [getError, setGetError] = useState(null)

    const authToken = () => {
        try {
            if (!Cookies.get('accessToken')) {
                router.push('/Login')
            }
            else {
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        authToken()
    }, [])

    const sendForm = async (e) => {
        e.preventDefault()
        try {
            if (email.trim() === ''){
                setEmailError('Email is Required')
            }
            if (password.trim() === ''){
                setPasswordError('Password is Required')
                return
            }

            const csrftoken = Cookies.get('csrftoken');

            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const response = await axios.post(
                'http://localhost:8000/api/users/login/',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken,
                    }
                }
            );
            
            if(response.data.error ){
                setGetError('Email or Password are invalid')
                return
            }

            // access Token
            const token = Cookies.set('accessToken', response.data?.token.access)

            // refreashToken
            localStorage.setItem('refreshToken', response.data?.token.refresh)


            if (token) {
                authToken()
                router.push('/');
            }

            console.log(response.headers)

        } catch (error) {
            console.error('Login error:', error.message);

        }
    }


    const togglePassword = (e) => {
        e.preventDefault()
        const inputPassword = document.getElementById('password')

        if (inputPassword.type === 'password') {
            inputPassword.type = 'text'
            document.getElementById('showPassword').innerText = 'Hide'
        } else {
            inputPassword.type = 'password'
            document.getElementById('showPassword').innerText = 'Show'
        }
    }


    return <section className="bg-gray-50 dark:bg-gray-900 h-screen place-content-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Link href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                Wide
            </Link>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700" >
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <span className={`${getError ? 'inline' : 'hidden'} text-red-500 relative left-[6rem]`}>{getError}</span>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={sendForm}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
                                value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                            <span id='emialError' className="text-sm text-red-500">{emailError}</span>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <div className="bg-gray-50 borderborder-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <input className="w-[75%] sm:w-[85%] bg-gray-50 outline-none  h-8  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" id="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <button onClick={togglePassword} id='showPassword' className="ml-3 text-sm font-semibold text-black  dark:text-primary-500">Show</button>
                            </div>
                            <span id='passwordError' className="text-sm text-red-500">{passwordError}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <Link href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">htmlForgot password?</Link>
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" >Sign in</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <Link href={'/register'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
}

export default Login