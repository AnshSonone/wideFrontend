import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import Loader from '../Components/Loader'
import API_BASE_URL from '../config'

const PostAnswer = ({id, fetchAnswer}) => {

    const [comment, setComment] = useState('')
    const [ loading, setLoading ] = useState(false)

    const videoId = id

    const answerPost = async () => {
      const token = Cookies.get('accessToken')
      const decode = jwtDecode(token)
        try {
            if(comment == '' ) return 
            
            setLoading(true)


            const formData = new FormData()
            formData.append('user', decode.user_id)
            formData.append('video', videoId)
            formData.append('comment', comment)
    
            let res = await axios.post(
              `${API_BASE_URL}/api/answer/`,
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
              )

              setComment('')
              fetchAnswer()
              setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            
        }
      }

    return (
        <div className="flex justify-center items-center" >
          <div className="w-[90%] flex items-center border-[1px] border-black rounded-md py-2 px-2">
          <textarea
          className="w-[95%] bg-transparent outline-none font-bold text-[14px]"
          type="text"
          placeholder="Type answer"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
           onClick={answerPost}
            className="transfrom hover: duratin-150 transition hover:scale-105 text-xl sm:text-2xl cursor-pointer"
          >
            { loading ? <Loader size={3} /> 
            // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><linearGradient id="a12"><stop offset="0" stop-color="#000000" stopOpacity="0"></stop><stop offset="1" stopColor="#000000"></stop></linearGradient><circle fill="none" stroke="url(#a12)" strokeWidth="15" strokeLinecap="round" strokeDasharray="0 44 0 44 0 44 0 44 0 360" cx="100" cy="100" r="70" transform-origin="center"><animateTransform type="rotate" attributeName="transform" calcMode="discrete" dur="2" values="360;324;288;252;216;180;144;108;72;36" repeatCount="indefinite"></animateTransform></circle></svg>
             : 
            <FaTelegramPlane />
}
          </button>
          </div>
         </div>
    )
}

export default PostAnswer;
