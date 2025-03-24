import { useState, useEffect } from 'react'
import Inputbox from '../Components/Inputbox'
import Post from '../Components/Post'
import Cookies from "js-cookie";
import axios from 'axios'
import { useSelector } from 'react-redux';
import { selectorUser } from '../../app/features/userSlice';
import Loader from '../Components/Loader';

export default function Home() {

  const user = useSelector(selectorUser)

  const [post, setPost] = useState([])
  const [answerPorfile, setAnswerPorfile] = useState(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const token = Cookies.get('accessToken')


  useEffect( () => {
      const handlePost = async () => {
        try {
          let res = await axios.get(
            `http://localhost:8000/api/videos?page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          setPost(res.data)
          console.log(res.data)
          if (res.status == 200){
            setLoading(false)
          }

        } catch (error) {
          console.log(error)
        }

      }
      handlePost()

  }, [page])


  return (
    <>
      {
        loading ? <div className='flex justify-center'><Loader /></div> :
          <main>
            
            <div>
              <div className=" flex flex-col items-center  overflow-x-hidden  px-2 py-2">

                <div className="my-2 w-[95%]">
                  <Inputbox
                    avatar={user.data?.avatar}
                    username={user.data?.username}
                  />
                  <div className="my-2">
                    <p className="my-1 text-sm text-slate-500 text-center">{post.length} results found</p>

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
                            // userId={items.user.id}
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
                  page && <button className={`${post.next == null ? 'hidden' : 'block' } border-[1px] border-black p-2`} onClick={() => setPage(page-1)} disabled={page == 1}>prev</button>
                }

                {
                  post && <button className='border-[1px] border-black p-2' >{page}</button>
                }

                {
                  post && <button className={`${post.next == null ? 'hidden' : 'block' } border-[1px] border-black p-2`} onClick={() => setPage(page+1)}>after</button>
                }
            </div>
          </main>
 }
</>
  )
}
