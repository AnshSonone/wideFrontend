import axios from 'axios'
import React, {useEffect, useState} from 'react'
import Loader from '../Components/Loader'
import API_BASE_URL from '../config'
import { useParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

function ResetPasword() {

  const {uid, token} = useParams()
  const [newPassword, setNewPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [resetStatus, setResetStatus] = useState(false)
  const [isError, setIsError] = useState("")
  const [loading, setLoading] = useState(false)
  const [inputType, setInputType] = useState('password')
  const [passwordError, setPasswordError] = useState("")

  const handleResetPassword = async () => {
    if (newPassword.trim() === '' && confPassword.trim() === '' && passwordError.trim() !== ''){
      return;
    }
    try {
      setLoading(true)
      let res = await axios.patch(
        `${API_BASE_URL}/api/users/reset/${uid}/${token}/`,
        {
          'password': newPassword,
        }
      )
  
      if (res.status===200){
        setResetStatus(true)
        setLoading(false)
        return <Navigate to={'/login'}/>
      }
    } catch (error) {
      console.log(error)
      setResetStatus(false)
      setIsError(error.response.data.message)
      setLoading(false)
    }
  }

  const handleInputType = () => {
    if (inputType == 'password'){
      setInputType('text')
    }
    else{
      setInputType('password')
    }
  }

  useEffect(() => {
    if (newPassword === confPassword) {
      setPasswordError('')
    } else if (newPassword.trim() === '' && confPassword.trim() === ''){
      setPasswordError('')
    }
     else {
      setPasswordError('New password and confrim password are not matching')
    }
  }, [newPassword, confPassword])


  return (
    <div>
        <div className="mx-4 p-4 flex flex-col justify-center items-center bg-gray-200 rounded-md relative top-[10rem] border-[1px] border-black">
                <h1 className="text-2xl md:text-3xl font-bold my-4">Reset Password</h1>
                <div className='space-y-2 flex flex-col md:flex-row items-center'>
                    <input 
                    className="outline-none p-2 border-[1px] font-bold rounded-md m-2"
                    type={inputType}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password  "
                    />

                    <input 
                    className="outline-none px-2 border-[1px] font-bold rounded-md h-[45px]"
                    type={inputType}
                    required
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    placeholder="confrim password "
                    />
                    </div>

                    <span className='text-red-500 m-2'>{passwordError}</span>

                  <button onClick={handleInputType} className="bg-gray-400 text-black py-1 text-sm px-1 hover:scale-105 transform transition duration-100 ">{inputType == 'password' ? 'Show' : 'Hide'}</button>
                <div className="my-2 ">
                <button className="bg-gray-400 text-black py-2 px-2 font-bold hover:scale-105 transform transition duration-100 hover:bg-gray-400" onClick={handleResetPassword}>{loading ? <Loader size={'1px'} wSize={'45px'}/> : 'Save'}</button>
                </div>
                <div>
                  
                </div>
                {
                      resetStatus && <div>
                    <span className="text-green-500 font-bold">password reset successfully</span>
                </div>
                }
                {
                      !resetStatus && <div>
                    <span className="text-red-500 font-bold">{isError}</span>
                </div>
                }
            </div>
    </div>
  )
}

export default ResetPasword