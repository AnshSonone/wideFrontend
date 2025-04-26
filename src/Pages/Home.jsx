import { useState, useEffect } from 'react'
import Inputbox from '../Components/Inputbox'
import Post from '../Components/Post'
import Cookies from "js-cookie";
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { LoginStatus, selectorUser } from '../../app/features/userSlice';
import Loader from '../Components/Loader';
import API_BASE_URL from '../config';

export default function Home() {

  const dispatch = useDispatch()

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = Cookies.get('accessToken')
        const res = await axios.get(`${API_BASE_URL}/api/users/profile/`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
  
        dispatch(LoginStatus(res.data, {LoginStatus: true}))
        setUserData(res.data)
      } catch (error) {
        console.log(error)
      }
     }

     getProfile()
  }, [])

  
  
  const [post, setPost] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const token = Cookies.get('accessToken')
  
  const handlePost = async () => {
    try {
        let res = await axios.get(
          `${API_BASE_URL}/api/videos?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        setPost(res.data)
        if (res.status == 200){
          setLoading(false)
        }

      } catch (error) {
        console.log(error)
      }

    }

  useEffect( () => {
      handlePost()

  }, [page])

  return (
    <>
      {
        loading ? <div className='flex justify-center'><Loader /></div> :
          <main>
            
            <div>
              <div className=" flex flex-col items-center overflow-x-hidden md:px-2 py-2">

                <div className="my-2 w-[95%]">
                  <Inputbox
                    avatar={userData?.avatar}
                    username={userData?.username}
                    handlePost={handlePost}
                  />
                  <div className="my-2">
                    {

                      post.result.result.map((items) => {
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

            </div>

              <div className='flex justify-center space-x-5'>
                {
                  page && <button className={`${post.previous == null ? 'hidden' : 'block' } border-[1px] border-black p-2`} onClick={() => setPage((prev) => prev-1)} disabled={page == 1}>prev</button>
                }

                {
                  post && <button className='border-[1px] border-black p-2' >{page}</button>
                }

                {
                  post && <button className={`${post.is_last_page ? 'hidden' : 'block' } border-[1px] border-black p-2`} onClick={() => setPage((prev) => prev+1)}>next</button>
                }
            </div>
          </main>
 }
</>
  )
}
