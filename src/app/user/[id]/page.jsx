'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdArrowBackIos } from "react-icons/md";
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Loading from '@/app/Loading';
import Cookies from 'js-cookie';
import UserInfo from '@/components/UserInfo';
import Post from '@/components/Post';
import Answer from '@/components/Answer';
import PostAnswer from '@/components/PostAnswer';

// Fetch user data server-side and render it
export default function UserProfile({ params }) {

  const router = useRouter()

  const [data, setData] = useState([])
  const [answer, setAnswer] = useState([])
  const [loading, setLoading] = useState(true)


  const fetchAnswer = async () => {
    try {
      const token = Cookies.get('accessToken')
      const res = await axios.get(`http://localhost:8000/api/answer/?q=${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAnswer(res.data);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get('accessToken') 
        const res = await axios.get(`http://localhost:8000/api/video/?video=${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
        fetchAnswer()
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchUserData()
  }, [data])

  return (
    <>
      <Navbar />
      <button className="outline-none text-xl m-4"
        onClick={() => router.push('/')}>
        <MdArrowBackIos />
      </button>
      {

        loading ? <Loading /> :
          <div className='flex flex-col my-4 mx-3 '>
            {
              data.map((items) => {
                return (
                  <div>
                    <UserInfo
                      key={items.id}
                      username={items.user.username}
                      avatar={items.user.avatar}
                      bio={items.user.bio}
                    />
                    <div>
                      <Post
                        key={items.id}
                        id={params.id}
                        videoDescription={items.videoDescription}
                        videoUrl={items.videoUrl}
                        tag={items.tag}
                        username={items.user.username}
                        avatar={items.user.avatar}
                        created={items.created}
                      />
                      <PostAnswer id={params.id}/>
                    </div>
                  </div>
                )
              })
            }

            {
              answer?.length == 0 && <div className='text-center my-4'>
                <span>No answer posted yet!</span>
              </div>
            }
            {
              answer.map((items) => {
                return (
                  <Answer
                    key={items.id}
                    id={items.id}
                    userId={items.user.id}
                    comment={items.comment}
                    commentDate={items.commentDate}
                    username={items.user.username}
                    avatar={items.user.avatar}
                  />
                )
              })
            }
          </div>
      }
    </>
  );
}

/*

    <div className='my-2'>
                        <span className='text-xl font-semibold'>
                        question post by you
                        </span>
                    </div>


    <div className='Sm:grid grid-cols-2 gap-2 mx-4 w-[24rem] sm:w-[30rem] p-2 '>
                    <div className='flex flex-col justify-center items-center bg-gray-100
                     py-2'>
                        <div className='my-2 w-[100%] '>
                        <div>
                                <strong>#tag</strong>
                            </div>
                            <div>
                                <p>description</p>
                            </div>
                        </div>
                        <div className=''>
                           imgae
                        </div>
                    </div>
                    <div className="my-2 bg-gray-100 py-2 px-2 rounded-md shadow-xl">
        
                </div>
                    </div>      
        
*/
