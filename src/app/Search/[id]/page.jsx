'use client'
import Loading from "@/app/Loading"
import Feed from "@/components/Post"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import Answer from "@/components/Answer"
import { MdArrowBackIos } from "react-icons/md";   
import Navbar from "@/components/Navbar"

const Search = ({params}) => {

    const router = useRouter()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const getSearch = async () => {
           const res = await axios.get(
      `http://localhost:8000/api/search/?q=${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      }
    )

    setData(res.data)
    console.log(res.data)
    setLoading(false)
    }

    useEffect(() => {
        getSearch()
    }, [])
    return (
    <>
            <Navbar />
        <div className="p-4">
            <button className="outline-none text-xl"
             onClick={() => router.push('/') }>
                <MdArrowBackIos />
             </button>
             <div className="text-center my-2">
                <span>Your search result for {params.id}</span>
             </div>
           {loading ? <Loading />
           :
           data.map((items) => {
               return (
                   <div className="flex flex-col justify-center items-center">
                    <div className="sm:w-[60vw]">
                    <Feed
                    key={items.id}
                    id={items.id}
                    username={items?.user.username}
                    avatar={items.user.avatar}
                    videoDescription={items.videoDescription}
                    videoUrl={items.videoUrl}
                    tag={items.tag}
                    created={items.created}
                    />
                    </div>
                </div>
            )
        })
           }
        </div>
        </>
    )
}

export default Search;