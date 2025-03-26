import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "../Components/Userinfo";
import { useSelector } from "react-redux";
import { selectorUser } from "../../app/features/userSlice";
import { MdArrowBackIos } from "react-icons/md";
import { RiReservedFill } from "react-icons/ri";
import Post from "../Components/Post";
import Loader from "../Components/Loader";

export default function Profile() {

    const navigate = useNavigate()
    const user = useSelector(selectorUser)
    const [video, setVideo] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchVideoData = async () => {
        try {

            const token = Cookies.get('accessToken')
            const res = await axios.get(`/api/question/${user.data?.id}`,
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
        fetchVideoData()
    }, [user])




    return (
        <>
            <button className="outline-none text-xl m-4 cursor-pointer"
                onClick={() => navigate(-1)}>
                <MdArrowBackIos />
            </button>
            {
                loading ? <div className="flex justify-center"><Loader /></div> :
                    <div>
                        <div>
                            <UserInfo
                                username={user?.data.username}
                                email={user?.data.email}
                                avatar={user?.data.avatar}
                                bio={user?.data.bio}
                            />
                        </div>
                        <div className="flex flex-col items-center">
                        <div className='my-2 mx-4'>
                            <span className='text-xl font-semibold'>
                                Question{video?.length > 1 ? "'s" : ''} posted by you {!video ? '0' : video.length}
                            </span>
                        </div>
                        <div>
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
                                        // userId={items.user.id}
                                        created={items.created}
                                    />
                                ))
                            }
                        </div>
                        </div>
                    </div>
            }
        </>
    )
}

