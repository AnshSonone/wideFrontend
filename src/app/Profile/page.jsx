'use client'

import Navbar from "@/components/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import UserInfo from "@/components/UserInfo";


export default function Profile(){

    const [userProfile, setUserProfile] = useState([])
    const [video, setVideo] = useState([])
    const [loading, setLoading] = useState(true)

    const getUserProfile = async () => {
        const token = Cookies.get('accessToken')
        const res = await axios.get(
            `http://localhost:8000/api/users/profile/`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    
        setUserProfile([res.data])
        
    }

    const fetchVideoData = async () => {
        try {

      const token = Cookies.get('accessToken')
      const res = await axios.get('http://localhost:8000/api/profile/',
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    setVideo(res.data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

useEffect(() => {
    getUserProfile()
    fetchVideoData()
    setLoading(false)
}, [])




    return (
        <>
        {
            loading ? <Loading /> :
            <div>
                <Navbar />
                <div>
                {
                     userProfile.map((items) => {
                        return (
                            <UserInfo
                            key={items.id}
                            username= {items.username}
                            avatar={items.avatar}
                            bio={items.bio}
                            />
                        )
                    })
                }
                </div>
            </div>
        }
        </>
    )
}


/**/