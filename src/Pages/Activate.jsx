import axios from 'axios'
import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Loader from '../Components/Loader'
import API_BASE_URL from '../config'

function Activate() {

  const {uid, token} = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState('')

  const handleActivate = async () => {
    try {
      setLoading(true)
      let res = await axios.patch(
        `${API_BASE_URL}/api/users/activate/${uid}/${token}/`,
      )
  
      if(res.status === 201){
        navigate('/login')
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsError(error.response.data.message)
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center flex-col items-center h-screen mx-4'>
      <h1 className='font-bold sm:text-xl md:text-3xl'>To get started activate your account </h1>
      <div className='flex justify-center my-4'>
      <button className='bg-gray-600 hover:bg-gray-700 sm:text-xl text-white font-bold p-2 shadow-md rounded-md hover:scale-105 transform transition duration-100' onClick={handleActivate}>{loading ? <Loader size={'10px'}/> : 'Activate'}</button>
      </div>
      <span className='text-red-500 font-bold'>{isError}</span>
    </div>
  )
}

export default Activate