import axios from 'axios';
import { useState, useRef, } from 'react'
import { FaTelegramPlane } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '../Components/Loader';
import image from "../asset/images.png";
import API_BASE_URL from '../config'

const Inputbox = ({ avatar, username }) => {

  const navigate = useNavigate()

  const inputRef = useRef(null)
  const hashRef = useRef(null)
  const fileRef = useRef(null)
  const [imageToPost, setImageToPost] = useState(null)
  const [loading, setLoading] = useState(false)


  const sendPost = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const token = Cookies.get('accessToken')
      const decode = jwtDecode(token)
  
  
      const fromData = new FormData()
      fromData.append('user', decode.user_id)
      fromData.append('videoDescription', inputRef)
      fromData.append('videoUrl', imageToPost)
      fromData.append('tag', hashRef)
  
      if (!(fromData.has('videoDescription') && fromData.has('videoUrl'))) return
  
      let res = await axios.post(`${API_BASE_URL}/api/videos/`,
        fromData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (res.status == 201) setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const addPost = (e) => {

    const reader = new FileReader()

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result)
    }

  }

  const removeToPost = () => {
    setImageToPost(null)
  }

  return (
    <div className="bg-gray-200 py-3 px-3 rounded-md shadow-xl border-black border-1">
      <div className="flex items-center ">
        <Link href={'/Profile'}>
          <img
            className='rounded-full cursor-pointer'
            src={avatar == null ? avatar : image}
            width={60}
            height={60}
            alt='profile'
            loading='lazy'
          />
        </Link>
        <form
          className="flex justify-between ml-2 border-[1px] border-gray-400 py-3 px-4 rounded-md w-[85%] sm:w-full bg-gray-100"
          onSubmit={sendPost}
        >
          <textarea
            className="outline-none text-[14px] text-gray-600 font-bold w-[80%] bg-gray-100 resize-none"
            type="text"
            ref={inputRef}
            placeholder={`Type where you laging,  ${username === null ? '' : username}`} >
          </textarea>
          <button
            className="transfrom hover: duratin-150 transition hover:scale-105 text-xl sm:text-2xl font-bold cursor-pointer"
            type="submit"
          >
            {
              loading ?
              <Loader size={'1vh'} wSize={30}/>
              :
              <FaTelegramPlane />
            }
          </button>
        </form>
        {(
          <div
            onClick={removeToPost}
            className="flex flex-col hover:brightness-110 transition duration-150 transfrom hover:scale-105 cursor-pointer ml-1"
          >
            {
              imageToPost && <img width={100} height={100} src={imageToPost} />
            }
            <p className="text-xs text-red-500 text-center font-bold">{imageToPost ? 'Remove' : ''}</p>
          </div>
        )}
      </div>
      <div className="flex item-center justify-center my-3 mx-2">
        <div
          className="flex flex-col items-center sm:flex-row hover:bg-gray-300
            		px-2 py-2 rounded-md cursor-pointer"
          onClick={() => {
            fileRef.current.click();
          }}
        >
          {/* <PhotoIcon className="text-normal text-green-500" /> */}
          <p className="font-semibold text-gray-600 text-sm">
            Photo/Video
          </p>
          <input
            ref={fileRef}
            onChange={addPost}
            id="file-input"
            type="file"
            hidden
          />
        </div>
        <div className='rounded-md border-black border-[1px] mx-2'>
          <input
            className='w-[10vh] sm:w-auto font-bold text-[14px] m-2 outline-none bg-transparent'
            type='text'
            placeholder='Java'
            ref={hashRef}
          />
        </div>
      </div>
    </div>
  )
}

export default Inputbox;