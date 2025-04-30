import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import UserInfo from '../Components/Userinfo';
import { useSelector } from 'react-redux';
import { selectorUser } from '../../app/features/userSlice';
import { MdArrowBackIos } from 'react-icons/md';
import Post from '../Components/Post';
import Loader from '../Components/Loader';
import API_BASE_URL from '../config'


// Fetch user data server-side and render it
export default function AnswerUser() {

    const params = useParams()
    const navigate = useNavigate()
    const user = useSelector(selectorUser)
    const [video, setVideo] = useState([])
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const token = Cookies.get('accessToken')

    const fetchAnsweredUserData = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/users/profile/${params.id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setProfile(res.data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const fetchVideoData = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/question/${params.id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setVideo(res.data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchAnsweredUserData()
        fetchVideoData()
    }, [])



    return (
        <>
            <button className="outline-none text-xl m-2 cursor-pointer"
                onClick={() => navigate('/')}>
                <MdArrowBackIos />
            </button>
            {
                loading ? <div className='flex justify-center'><Loader /></div> :
                    <div>
                        <div className='lg:mx-9'>
                            <UserInfo
                                username={profile?.username}
                                email={profile?.email}
                                avatar={profile?.avatar}
                                bio={profile?.bio}
                            />
                        </div>
                        <div className='flex flex-col items-center'>
                        <div className='my-2 mx-4'>
                            <span className='text-xl font-semibold'>
                                Question{video?.length > 1 ? "'s" : ''} posted by you {!video ? '0' : video.length}
                            </span>
                        </div>
                        <div className='w-full lg:w-[95%]'>
                            {
                                video.map((items) => (
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
                                ))
                            }
                        </div>
                    </div>
                        </div>
            }
        </>
    );
}

