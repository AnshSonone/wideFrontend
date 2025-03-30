import axios from 'axios'
import React, {useState} from 'react'
import Loader from '../Components/Loader'
import API_BASE_URL from '../config'

function ResetPasword() {

  const [newPassword, setNewPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [resetStatus, setResetStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [inputType, setInputType] = useState('password')

  const handleResetPassword = async () => {
    try {
      if (newPassword != confPassword ) return
      setLoading(true)
      let res = await axios.get(
        `${API_BASE_URL}/api/users/reset/`,
        {
          'newPassword': newPassword,
          'confPassword': confPassword
        }
      )
  
      if (res==200){
        setResetStatus(true)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setResetStatus(false)
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

  return (
    <div>
        <div className="mx-4 p-4 flex flex-col justify-center items-center bg-gray-200 rounded-md relative top-[10rem] border-[1px] border-black">
                <h1 className="text-2xl md:text-3xl font-bold my-4">Reset Password</h1>
                <div className='space-y-2'>
                    <input 
                    className="outline-none p-2 border-[1px] font-bold rounded-md"
                    type={inputType}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password  "
                    />

                    <input 
                    className="outline-none p-2 border-[1px] font-bold rounded-md"
                    type={inputType}
                    required
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    placeholder="Re-type new Password  "
                    />

                  <button onClick={handleInputType} className="bg-gray-600 py-1 text-sm px-1 hover:scale-105 transform transition duration-100 text-white">{inputType == 'password' ? 'Show' : 'Hide'}</button>
                </div>
                <div className="my-2 ">
                <button className="bg-gray-600 text-white py-2 px-2 font-bold hover:scale-105 transform transition duration-100 hover:bg-gray-400" onClick={handleResetPassword}>{loading ? <Loader size={'15px'}/> : 'Save'}</button>
                </div>
                <div>
                  
                </div>
                {
                      resetStatus && <div>
                    <span className="text-green-500">password reset successfully</span>
                </div>
                }
                {
                      resetStatus == false && <div>
                    <span className="text-red-500">Something went wrong!</span>
                </div>
                }
            </div>
    </div>
  )
}

export default ResetPasword