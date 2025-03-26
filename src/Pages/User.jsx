import { useEffect, useState } from 'react';
import axios from 'axios';
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Components/Loader'; 
import Cookies from 'js-cookie';
import UserInfo from '../Components/Userinfo';
import Post from '../Components/Post';
import Answer from '../Components/Answer';
import PostAnswer from '../Components/PostAnswer';

// Fetch user data server-side and render it
export default function User() {

  const navigate = useNavigate()
  const params = useParams()

  const [data, setData] = useState([])
  const [answer, setAnswer] = useState([])
  const [loading, setLoading] = useState(true)


  const fetchAnswer = async () => {
    try {
      const token = Cookies.get('accessToken')
      const res = await axios.get(`/api/answer/?q=${params.id}`, {
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
        const res = await axios.get(`/api/video/?video=${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
        fetchAnswer()
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false)
      }
    }

    fetchUserData()
  }, [answer])

  return (
    <>
      <button className="outline-none text-xl m-4"
        onClick={() => navigate(-1)}>
        <MdArrowBackIos />
      </button>
      {

        loading ? <Loader /> : 
          <div className='flex flex-col my-4 mx-3 '>
            {
              data.length == 0 ?
              <div className='text-center my-4'>
                <span>This page is not exist anymore or user removed this discussition. Please go to Home</span>
              </div>
              :
              data.map((items) => {
                return (
                  <div key={items.id}>
                    <UserInfo
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
                        userId={items.user.id}
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
