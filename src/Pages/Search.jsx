import Post from "../Components/Post"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { MdArrowBackIos } from "react-icons/md";   
import Loader from '../Components/Loader'
import API_BASE_URL from "../config"

const Search = () => {

    const navigate = useNavigate()
    const params = useParams()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const getSearch = async () => {
           const res = await axios.get(
      `${API_BASE_URL}/api/search/?q=${params.param}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      }
    )
    
    setData(res.data)
    setLoading(false)
    }

    useEffect(() => {
        getSearch()
    }, [params])
    
    return (
        <div className="my-2">
            <button className="outline-none text-xl mx-2 cursor-pointer"
             onClick={() => navigate(-1) }>
                <MdArrowBackIos />
             </button>
             <div className="text-center my-2">
                <span>{data.length >= 1 ? data.length : "0"} Result found for <strong>{params.param}</strong></span>
             </div>
           {loading ? <div className="flex justify-center"><Loader /></div>
           :
           data.map((items) => {
               return (
                   <div className="flex flex-col justify-center md:items-center" key={items.id}>
                    <div className="md:w-[95vw]">
                    <Post
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
    )
}

export default Search;