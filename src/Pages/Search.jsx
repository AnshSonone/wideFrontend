import Post from "../Components/Post"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import Answer from "../Components/Answer"
import { MdArrowBackIos } from "react-icons/md";   
import Loader from '../Components/Loader'
import image from "../asset/images.png";

const Search = () => {

    const navigate = useNavigate()
    const params = useParams()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const getSearch = async () => {
           const res = await axios.get(
      `/api/search/?q=${params.param}`,
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
        <div className="p-4">
            <button className="outline-none text-xl"
             onClick={() => navigate(-1) }>
                <MdArrowBackIos />
             </button>
             <div className="text-center my-2">
                <span>Your search result for <strong>{params.param}</strong></span>
             </div>
           {loading ? <Loader />
           :
           data.map((items) => {
               return (
                   <div className="flex flex-col justify-center items-center" key={items.id}>
                    <div className="sm:w-[80vw]">
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