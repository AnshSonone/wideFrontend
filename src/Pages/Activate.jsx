import axios from 'axios'
import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Loader from '../Components/Loader'

function Activate() {

  const {uid, token} = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleActivate = async () => {
    try {
      setLoading(true)
      let res = await axios.patch(
        '/api/users/activate/',
        {
          "uid": uid,
          'token': token
        }
      )
  
      if(res.status === 201){
        navigate('/login')
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center flex-col items-center h-screen mx-4'>
      <h1 className='font-bold sm:text-xl md:text-3xl'>To get started activate your account </h1>
      <div className='flex justify-center my-4'>
      <button className='bg-gray-600 hover:bg-gray-700 sm:text-xl text-white font-bold p-2 shadow-md rounded-md hover:scale-105 transform transition duration-100' onClick={handleActivate}>{loading ? <Loader size={30}/> : 'Activate'}</button>
      </div>
    </div>
  )
}

export default Activate