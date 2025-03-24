import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { jwtDecode } from "jwt-decode";

const Answer = ({ id, username, avatar, comment, commentDate, userId }) => {
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
    console.log('clicked')
    const res = await axios.delete(
      `http://localhost:8000/api/answer/${answerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return (
    <div
      className="my-2 bg-gray-200 py-2 px-2 rounded-md shadow-xl"
    >
      <div className="flex items-center" onClick={dynamicRoute}>
        <img
          className="border-black shadow-sm border-2 rounded-full"
          src={avatar}
          width={45}
          height={45}
          alt="avatar"
        />
        <div className="mx-2">
          <p className="text-xl font-semibold cursor-pointer hover:text-blue-500 hover:underline">
            {username}
          </p>
        </div>
      </div>
      <div className="m-1">
        <span>{time.toDateString()}</span>
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
        <article className="font-semibold">{comment}</article>
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
