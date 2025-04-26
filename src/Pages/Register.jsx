import {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Loader from '../Components/Loader'
import API_BASE_URL from '../config'

const register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [bio, setBio] = useState('')
    const [avatar, setAvatar] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isEamailSend, setISEmailend] = useState(false)
    const [getError, setGetError] = useState('')

    const handlePic = (e) => {
        if (e.target.file && e.target.file[0]) setAvatar(e.target.file[0])
    }

    const sendForm = async (e) => {
        setLoading(true)
        try {
            e.preventDefault()
            
            if ( username.trim() === ""){
                document.getElementById('usernameError').innerText = 'Username field is required'
                setLoading(false)
                return
            }
    
            if ( email.trim() === ""){
                document.getElementById('emailError').innerText = 'Email field is required'
                setLoading(false)
                return
            }
    
            if ( password.trim() === ""){
                document.getElementById('passwordError').innerText = 'password field is required'
                setLoading(false)
                return
            }
    
            let res = await axios.post(
                `${API_BASE_URL}/api/users/register/`,
                {
                    'username': username,
                    "email": email,
                    "password": password,
                    'bio': bio,
                    "avatar": avatar,
                }
            )

            setISEmailend(true)
            setLoading(false)
            setUsername('')
            setEmail('')
            setPassword('')
            setBio('')
            setAvatar(null)
            
            
        } catch (error) {
            setGetError(error.response.data.email)
            console.log(error)
            setLoading(false)
        } 
    }

    return <section className="bg-gray-50  h-screen ">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
         <span>
             Wide    
         </span>
        </div>
        <div className="w-full bg-gray-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
            <div className="p-6 space-y-2 md:space-y-6 sm:p-8">
                {
                    isEamailSend && <span className="text-green-500">we have Send activation link on your email</span>
                }
                <span className="text-red-500 flex justify-center font-bold">{getError}</span>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl  mb-2">
                    Sign up to your account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">username</label>
                        <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required="" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <span className="text-sm text-red-500" id="usernameError"></span>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required="" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <span className="text-sm text-red-500" id="emailError"></span>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <span className="text-sm text-red-500" id="passwordError"></span>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Bio</label>
                        <input type="text" name="bio" id="bio" placeholder="Hey wide" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={bio} onChange={(e) => setBio(e.target.value)}/>
                    </div>

                    <div className="">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar</label>
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onClick={handlePic} type="file" name="avatar" id="avatar"  />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="remember" className="">Remember me</label>
                            </div>
                        </div>

                    </div>
                    <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-primary-800 flex justify-center" onClick={sendForm}>{loading ? <Loader wSize={"50px"} size={"1px"} /> : 'Sign up'}</button>                
                    </form>

                    <div>
                    <p className="text-sm font-light ">
                    Already signup? <Link to={{pathname: '/login'}} className="font-medium  hover:underline ">Sign in</Link></p>
                    </div>
            </div>
        </div>
    </div>
  </section>
}

export default register;