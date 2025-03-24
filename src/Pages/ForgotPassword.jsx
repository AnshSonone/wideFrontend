import axios from "axios"
import React, {useState} from "react"

function ForgotPassword(){

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [emailSendStatus, setEmailSendStatus] = useState(false)
    const [err, setErr] = useState(false)

    const handleForotPasword = async () => {
        if (!email) return;
        try{
            setLoading(true)
            let res = await axios.post(
                'http://Localhost:8000/api/users/forgot/',
                {
                    'email': email,
                },
            )

            if (res.status == 200){
                setLoading(false)
                setEmailSendStatus(true)
            }
        }catch(error){
            console.log(error)
            setLoading(false)
            setEmailSendStatus(false)
            setErr(true)
        }
        
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="md:w-1/4 mx-4 h-[17rem] p-4 bg-gray-100 place-items-center rounded-md relative top-[10rem] border-1 border-black">
                <h1 className="text-2xl sm:text-3xl font-bold my-4">Forgot Password</h1>
                <div className="mt-8">
                    <input 
                    className="outline-none p-2 border-[1px] font-bold "
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="type your email"
                    />
                </div>
                <div className="my-6 ">
                <button className="bg-gray-300 py-2 px-4 font-bold hover:scale-105 transform transition duration-100 hover:bg-gray-400">Reset</button>
                </div>
                {
                    emailSendStatus && <div>
                    <span className="text-green-500 my-4">we send reset password link on {email}</span>
                </div>
                }
                </div>
        </div>
    )
}

export default ForgotPassword;