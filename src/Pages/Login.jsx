import React, { useState, useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { useNavigate, Link} from "react-router-dom"
import { useDispatch } from "react-redux"
import {LoginStatus} from '../../app/features/userSlice'
import Loader from '../Components/Loader'
import { jwtDecode } from "jwt-decode"
import { Navigate } from "react-router-dom"

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [getError, setGetError] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const refresh = localStorage.getItem('refreshTOken')
        if (refresh){
            const decode = jwtDecode(token).exp * 1000
            const now = new Date.now()
            if (decode < now){
                navigate('/login')
            }
        }
    }, [])

    const sendForm = async (e) => {
        e.preventDefault()
        if (email.trim() === ''){
            setEmailError('Email is Required')
        }
        if (password.trim() === ''){
            setPasswordError('Password is Required')
            return
        }
        try {
            setLoading(true)
            const csrftoken = Cookies.get('csrftoken');

            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const res = await axios.post(
                'http://localhost:8000/api/users/login/',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken,
                    }
                }
            );
            
            if(res.data.error ){
                setGetError('Email or Password are invalid')
                return
            }

            // access Token
            const token = Cookies.set('accessToken', res.data?.token.access)

            // refreashToken
            localStorage.setItem('refreshToken', res.data?.token.refresh)


            if (token) {
                navigate('/');
                setLoading(false)
            }


        } catch (error) {
            console.error('Login error:', error.message);
            setGetError(true)
            setLoading(false)

        }
    }


    const togglePassword = (e) => {
        e.preventDefault()
        const inputPassword = document.getElementById('password')

        if (inputPassword.type === 'password') {
            inputPassword.type = 'text'
            document.getElementById('showPassword').innerText = 'Hide'
            document.getElementById('password').focus()
        } else {
            inputPassword.type = 'password'
            document.getElementById('showPassword').innerText = 'Show'
            document.getElementById('password').focus()
        }
    }



    return <section className="bg-gray-50 dark:bg-gray-100 h-screen place-content-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Link href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-black">
                {/* Set wed ap  logo
                 <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" /> */}
                Wide
            </Link>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-200 dark:border-gray-700" >
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <span className={`${getError ? 'inline' : 'hidden'} text-red-500 relative left-[6rem]`}>{getError}</span>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Sign in to your account
                    </h1>
                    <div className="space-y-4 md:space-y-6" >
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                            <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
                                value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                            <span id='emialError' className="text-sm text-red-500">{emailError}</span>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            <div className="bg-gray-50 borderborder-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <input className="w-[75%] sm:w-[85%] bg-gray-50 outline-none  h-8  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type='password' id="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <span onClick={togglePassword} id='showPassword' className="ml-3 text-sm font-semibold text-white  dark:text-primary-500 cursor-pointer">Show</span>
                            </div>
                            <span id='passwordError' className="text-sm text-red-500">{passwordError}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                </div>
                                <div className="ml-1 sm:ml-3 text-sm">
                                    <label htmlFor="remember" className="text-black">Remember me</label>
                                </div>
                            </div>
                            <Link to={{pathname: '/forgot'}} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                        </div>
                        <button onClick={sendForm} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-primary-800 flex justify-center" >{ loading ? <Loader size={10}/> : 'Sign in'}</button>
                        <p className="text-sm font-light text-gray-600 dark:text-gray-600">
                            Don’t have an account yet? <Link to={{pathname: '/register'}} className="font-medium text-primary-600 hover:underline dark:text-black">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
}

export default Login
 