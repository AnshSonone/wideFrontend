import axios from "axios";
import API_BASE_URL from "../config";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { jwtDecode } from "jwt-decode";

const Answer = ({ id, username, avatar, comment, commentDate, userId, fetchAnswer }) => {
  const time = new Date(commentDate);
  const navigate = useNavigate();
  const token = Cookies.get("accessToken");
  const answerId = id;
  const user = jwtDecode(token);
  let isUpdatePenClicked;

  const dynamicRoute = () => {
    navigate(`/answered/${userId}`);
  };

  const deleteAnswer = async () => {
    const res = await axios.delete(
      `${API_BASE_URL}/api/answer/${answerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchAnswer()
  };

  return (
    <div
      className="my-4 bg-gray-200 py-3 px-2  rounded-md shadow-xl"
    >
      <div className="flex items-center cursor-pointer w-fit" onClick={dynamicRoute}>
        <img
          className="border-black shadow-sm rounded-full"
          src={`https://res.cloudinary.com/da25rozpm/${avatar}.png`}
          width={'50px'}
          height={'50px'}
          alt="avatar"
        />
        <div className="mx-2 ">
          <p className="text-[14px] font-semibold cursor-pointer hover:text-blue-500 hover:underline">
            {username}
          </p>
        <p className="text-[12px] text-gray-500 font-semibold">{time.toDateString()}</p>
        </div>
      </div>
      <div className="my-2 mx-1 ">
        {isUpdatePenClicked && (
          <form
            className="flex items-center border-[1px] border-black rounded-md"
            onSubmit={updateAnswer}
          >
            <textarea
              className="mt-3 mx-3 w-[88%] bg-transparent outline-none font-bold text-[14px]"
              type="text"
              placeholder="Updateed comment"
            ></textarea>
            <button
              className="  hover:bg-gray-300 p-2 border-[1px] border-black rounded-md text-sm"
              type="submit"
            >
              Update
            </button>
          </form>
        )}
        <article className="font-semibold text-[14px]">{comment}</article>
      </div>
      {user?.user_id === userId && (
        <div className="space-x-2" onClick={deleteAnswer}>
          <button
            className=" hover:bg-gray-300 p-2 border-[1px] border-black rounded-md text-sm"
          >
            <RiDeleteBin5Line />
          </button>
        </div>
      )}
    </div>
  );
};

export default Answer;
