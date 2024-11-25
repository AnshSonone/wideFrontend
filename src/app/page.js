'use client'


import Post from "@/components/Post";
import Navbar from "@/components/Navbar";
import Cookies from "js-cookie";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect, } from 'react';
import Inputbox from "@/components/Inputbox";
import Loading from "@/app/Loading";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Login, selectorSearch } from "@/features/searchSlice";
import Profile from "./Profile/page";



export default function Home() {

  const router = useRouter()
  const search = useAppSelector(selectorSearch)
  const dispatch = useAppDispatch()


  const [post, setPost] = useState([])
  const [profile, setProfile] = useState(null)
  const [answer, setAnswer] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    if (!Cookies.get('accessToken')) {
      return redirect('/Login')
    }else{
      const getProfile = async () => {
        try {
          const token = Cookies.get('accessToken')
          const res = await axios.get(`http://localhost:8000/api/users/profile/`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          dispatch(Login(res.data))
          setProfile(res.data)
        } catch (error) {
          console.log(error)
        }
      }

      getProfile()
    }

  }, [Profile])


  useEffect( () => {
    if (Cookies.get('accessToken')){
      const handlePost = async () => {
        try {
          let res = await axios.get(
            'http://localhost:8000/api/videos/',
            {
              headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
              }
            }
          )
          setPost(res.data)
    
          let answerRes = await axios.get(
            `http://localhost:8000/api/answer/`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
              }
            }
          )
          setAnswer(answerRes.data)
          setLoading(false)
        } catch (error) {
          console.log(error)
        }
      }
      handlePost()
    }

  }, [])

  const findSearch = async (e) => {
    e.preventDefault()

    router.push(`Search/${search}`)


  }

  const getNewAccessToken = async () => {
    try {

      const refreshToken = localStorage.getItem('refreshToken')
      console.log(refreshToken)

      const formData = new FormData()

      formData.append('refresh', refreshToken)
      const res = await axios.get(
        'http://localhost:8000/api/token/refresh/',
        formData,
      )

      if (res.status == 200) Cookies.set('accessToken', res.data.access)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {
        loading ? <Loading /> :
          <main>
            <Navbar 
            findSearch={findSearch}
            />
            <div>
              <div className=" flex flex-col items-center  overflow-x-hidden  px-2 py-2">

                <div className="my-2 sm:max-w-[80vw] ">
                  <Inputbox
                    avatar={profile?.avatar}
                    username={profile?.username}
                  />
                  <div className="my-2">
                    <p className="my-1 text-sm text-slate-500 text-center">{post.length} results found</p>

                    {

                      post.map((items) => {
                        return (
                          <Post
                            key={items.id}
                            id={items.id}
                            username={items?.user.username}
                            avatar={items.user.avatar}
                            videoDescription={items.videoDescription}
                            videoUrl={items?.videoUrl}
                            tag={items.tag}
                            userId={items.user.id}
                            created={items.created}
                          />
                        )
                      })
                    }
                  </div>
                </div>
              </div>

            </div>
          </main>
      }
    </>
  );
}


/*

<div className="space-x-2 grid grid-cols-1 sm:grid-cols-[1fr_45vw] overflow-x-hidden place-content-center mx-2 my-2">

              <div className="my-2">
                <Inputbox
                  avatar={profile?.avatar}
                  username={profile?.username}
                />
                <div className="my-2">
                  <p className="my-1 text-sm text-slate-500 text-center">{post.length} results found</p>

                  {

                    post.map((items) => {
                      return (
                        <Post
                          key={items.id}
                          id={items.id}
                          username={items?.user.username}
                          avatar={items.user.avatar}
                          videoDescription={items.videoDescription}
                          videoUrl={items?.videoUrl}
                          tag={items.tag}
                          created={items.created}
                        />
                      )
                    })
                  }
                </div>
              </div>
            </div>

 */