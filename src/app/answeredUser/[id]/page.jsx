"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Loading from '@/app/Loading';

// Fetch user data server-side and render it
export default function UserProfile({ params }) {

    const [data, setData] = useState([])
    const [video, setVideo] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchUserData = async () => {
        try {
      const token = Cookies.get('accessToken')
      const res = await axios.get(`http://localhost:8000/api/answer/?search=${params.id}`,
           {
            headers: {
              Authorization: `Bearer ${token}`,
            },
      }
  );
      setData(res.data)
      fetchVideoData()
      setLoading(false)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
  }

    if (!data) {
        return <div>User not found or an error occurred.</div>;
    }

    const fetchVideoData = async () => {
        const token = Cookies.get('accessToken')
        const res = await axios.get(
            `http://localhost:8000/api/video/?video=${params.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        setVideo(res.data)
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    return (
        <>
        <Navbar />
        {
         loading ?    <Loading /> :
         <div className='flex flex-col my-4 items-center'>
            <div className='bg-gray-100 py-10 px-5 w-[100%]'>
                <div className='flex flex-col justify-center items-center '>
                    <div className='rounded-full'>
                        <Image
                            src={data.user.avatar ? 'https://res.cloudinary.com/dmsj2cz1b/image/upload/v1/video/images_c8im89' : data.user.avatar}
                            width={100}
                            height={100}
                            alt='profile pic'
                        />
                    </div>
                    <div>
                        <strong className='font-semibold text-xl'>{data && data.user.username}</strong>
                    </div>
                    <div>
                        <p>{data.user.bio}</p>
                    </div>
                </div>
            </div>
            <div className='my-2'>
                <span className='text-xl font-semibold'>
                Question{video?.length > 1 ? "'s": ''} posted by you {!video ? '0' : video.length}
                </span>
            </div>

        {  video.message ?
        <div>
        <span>{video.message}</span>
    </div>
    :
        // Question Section
        <div className='mx-4 w-[24rem] sm:w-[30rem] p-2 '>
            <div className='flex flex-col justify-center items-center bg-gray-100
             p-2 shadow-sm rounded-sm'>
                <div className='my-2 w-[100%] flex items-center justify-between'>
                <div>
                        <p>{video && video[0]?.videoDescription}</p>
                    </div>
                    <div>
                        <strong>#{video[0]?.tag}</strong>
                    </div>
                </div>
                <div className=''>
                    <Image
                        src={data && video[0]?.videourl}
                        className=''
                        width={150}
                        height={150}
                        alt='question'
                    />
                </div>
            </div>
            <div className="my-2 bg-gray-100 py-2 px-2 rounded-md shadow-xl">
            <div className="flex items-center">
                <Image
                className="border-black shadow-sm border-2 rounded-full"
                src={video[0]?.answer.user.avatar}
                width={45}
                height={45}
                alt="avatar"
                />
                <div className="mx-2">
                    <p className="text-xl font-semibold">{video[0]?.answer.user.username}</p>
                </div>
            </div>
            <div className="m-1">
                <span>{video[0]?.answer.commentDate}</span>
            </div>
            <div className="my-2 mx-1">
                <article className="font-semibold">{data && video[0]?.answer.comment}</article>
            </div>

        </div>
            </div>
}
        </div>
}
        
        </>
    );
}

