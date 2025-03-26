import image from "../asset/images.png"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectorSearch } from "../../app/features/searchSlice";
import { RiDeleteBin5Line } from "react-icons/ri";
import Cookies from "js-cookie";
import axios from "axios";
import { copyWithStructuralSharing } from "@reduxjs/toolkit/query";
import { jwtDecode } from "jwt-decode";


export default function Post({ id, username, avatar, created, videoDescription, videoUrl, tag, userId }) {

  const time = new Date(created)
  const navigate = useNavigate()
  const token = Cookies.get('accessToken')
  // const user = useSelector(selectorSearch)
  const postId = id
  const user = jwtDecode(token)

  const dynamicRoute = () => {
    navigate(`/user/${postId}`)
  }

  const deletePost = async () => {

    let res = await axios.delete(`/api/videos/${postId}`
      ,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

  }

  console.log(avatar)


  return (
    <div className=" bg-gray-200 py-2 rounded-md shadow-xl m-4 space-y-2" >
      {/* {
        loader && <svg className="absolute h-[6rem] left-[45%]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><linearGradient id="a12"><stop offset="0" stop-color="#000000" stop-opacity="0"></stop><stop offset="1" stop-color="#000000"></stop></linearGradient><circle fill="none" stroke="url(#a12)" stroke-width="15" strokeLinecap="round" strokeDasharray="0 44 0 44 0 44 0 44 0 360" cx="100" cy="100" r="70" transform-origin="center"><animateTransform type="rotate" attributeName="transform" calcMode="discrete" dur="2" values="360;324;288;252;216;180;144;108;72;36" repeatCount="indefinite"></animateTransform></circle></svg>
      } */}
      <div onClick={dynamicRoute}>
      <div className="flex items-center justify-between pt-[2px] cursor-pointer pr-3" >
        <div className="flex items-center pl-1">
          <img
            className="rounded-full shadow-md border-black border-2"
            width={40}
            height={40}
            src={avatar}
            alt="avatar"
            loading="lazy"
          />
          <div className="mx-2">
            <div className="flex justify- items-center mt-[-4px] w-[100%]" onClick={dynamicRoute}>
              <h2 className="font-bold text-[14px] hover:underline hover:text-blue-500">
                {username}
              </h2>
            </div>
            <p className="text-[12px] text-gray-500 font-semibold">{time.toDateString()}</p>
          </div>
        </div>
        <p className="font-bold">#{tag}</p>
          </div>
      <div className="">
        <div className="my-3 mx-2 text-[16px] font-semibold">
          <p>{videoDescription}</p>
        </div>
        <div className={`${videoUrl != null ? 'flex justify-center my-2' : 'hidden'}`}>
          <img
            className="w-[50%]"
            width={100}
            height={100}
            src={videoUrl != null ? videoUrl : '/no'}
            alt="pic"
            />
        </div>
      </div>
      </div>

      {

        user?.user_id === userId && <div className="space-x-2 mx-2 flex items-center p-2 border-[1px] border-black rounded-md text-sm w-fit cursor-pointer hover:bg-gray-300 ">
          <span className="font-semibold">Remove Post</span>
        <button className="" onClick={deletePost}>
          <RiDeleteBin5Line />
        </button>
      </div>
      }

    </div>
  )
}

