import API_BASE_URL from '../config';
import { useNavigate, useLocation } from 'react-router-dom';
import { RiDeleteBin5Line } from "react-icons/ri";
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Post({ id, username, avatar, created, videoDescription, videoUrl, tag, userId }) {

  const time = new Date(created)
  const navigate = useNavigate()
  const loacation = useLocation()
  const token = Cookies.get('accessToken')
  const postId = id
  const user = jwtDecode(token)

  const dynamicRoute = () => {
    navigate(`/user/${postId}`)
  }

  const deletePost = async () => {

    let res = await axios.delete(`${API_BASE_URL}/api/videos/${postId}`
      ,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    navigate('/')

  }

  

  return (
    <div className=" bg-gray-200 py-2 px-2 rounded-md shadow-xl my-4 space-y-2 animate-fade
" >
      <div >
      <div className="flex items-center justify-between pt-[2px] cursor-pointer pr-3" onClick={dynamicRoute}>
        <div className="flex items-center pl-1 ">
          <img
            className="rounded-full shadow-md border-black border-2"
            width={40}
            height={40}
            src={avatar}
            alt="avatar"
            loading="lazy"
          />
          <div className="mx-2">
            <div className="flex justify- items-center mt-[-4px] w-[100%]">
              <h2 className="font-bold text-[14px] hover:underline hover:text-blue-500">
                {username}
              </h2>
            </div>
            <p className="text-[12px] text-gray-500 font-semibold">{time.toDateString()}</p>
          </div>
        </div>
        <p className="font-bold">#{tag}</p>
          </div>
      <div className="cursor-pointer">
        <div className="my-3 mx-2 text-[16px] font-semibold">
          <p>{videoDescription}</p>
        </div>
        {/* <div className={`${videoUrl != null ? 'flex justify-center my-2' : 'hidden'}`}>
          <img
            className="w-[50%]"
            width={100}
            height={100}
            src={videoUrl != null ? videoUrl : ''}
            alt="pic"
            />
        </div> */}
      </div>
      </div>

      {

        user?.user_id === userId && <div onClick={deletePost} className="space-x-2 mx-2 flex items-center p-2 border-[1px] border-black rounded-md text-sm w-fit cursor-pointer hover:bg-gray-300 ">
          <span className="font-semibold">Remove Post</span>
        <button className="" >
          <RiDeleteBin5Line />
        </button>
      </div>
      }

    </div>
  )
}

