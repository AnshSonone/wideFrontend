import axios from "axios";
import { useState, useRef } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import API_BASE_URL from "../config";

const programmingLanguages = [
  "Python",
  "JavaScript",
  "Java",
  "C",
  "C++",
  "C#",
  "Go",
  "Rust",
  "Ruby",
  "PHP",
  "Swift",
  "Kotlin",
  "TypeScript",
  "Scala",
  "Dart",
  "Perl",
  "Haskell",
  "Elixir",
  "Erlang",
  "Lua",
  "Objective-C",
  "R",
  "MATLAB",
  "Groovy",
  "Shell",
  "Bash",
  "PowerShell",
  "F#",
  "Visual Basic .NET",
  "Assembly",
  "VHDL",
  "Verilog",
  "Solidity",
  "Julia",
  "COBOL",
  "Fortran",
  "Crystal",
  "Zig",
  "Nim",
  "OCaml",
  "Scheme",
  "Common Lisp",
  "Prolog",
  "Ada",
  "ABAP",
  "SAS",
  "Tcl",
  "Hack",
  "ReasonML",
  "ReScript",
  "Elm",
  "Pony",
  "V",
  "Nix",
  "Smalltalk",
  "Raku",
  "Delphi/Object Pascal",
  "Q#",
  "ML",
  "AWK",
];

const Inputbox = ({ avatar, username, handlePost }) => {
  const inputRef = useRef(null);
  const hashRef = useRef(null);
  // const fileRef = useRef(null)
  // const [imageToPost, setImageToPost] = useState(null)
  const [loading, setLoading] = useState(false);

  const sendPost = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = Cookies.get("accessToken");
      const decode = jwtDecode(token);

      if (!inputRef.current.value) return;

      let res = await axios.post(
        `${API_BASE_URL}/api/videos/`,
        {
          user: decode.user_id,
          videoDescription: inputRef.current.value,
          // "videoUrl": imageToPost,
          tag: hashRef.current.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status == 201) {
        handlePost();
        inputRef.current.value = ""
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // const addPost = (e) => {

  //   const reader = new FileReader()

  //   if (e.target.files[0]) {
  //     reader.readAsDataURL(e.target.files[0])
  //   }

  //   reader.onload = (readerEvent) => {
  //     setImageToPost(readerEvent.target.result)
  //   }

  // }

  // const removeToPost = () => {
  //   setImageToPost(null)
  // }

  return (
    <div className="bg-gray-200 py-3 px-3 rounded-md shadow-xl border-black border-1">
      <div className="flex  items-center ">
        <Link to={"/Profile"}>
          <img
            className="rounded-full cursor-pointer"
            src={`https://res.cloudinary.com/da25rozpm/${avatar}.png`}
            width={'60px'}
            height={'60px'}
            alt="profile"
            loading="lazy"
          />
        </Link>
        <form
          className="flex justify-between ml-2 border-[1px] border-gray-400 py-3 px-4 rounded-md w-[85%] sm:w-full bg-gray-100"
          onSubmit={sendPost}
        >
          <textarea
            className="outline-none text-[14px] text-gray-600 font-bold w-[80%] bg-gray-100 resize-none"
            type="text"
            ref={inputRef}
            placeholder={`Type where you laging,  ${
              username === null ? "" : username
            }`}
          ></textarea>
          <button
            className="transfrom hover: duratin-150 transition hover:scale-105 text-xl sm:text-2xl font-bold cursor-pointer"
            type="submit"
          >
            {loading ? <Loader size={"1vh"} wSize={30} /> : <FaTelegramPlane />}
          </button>
        </form>
        {/* {(
          <div
            onClick={removeToPost}
            className="flex flex-col hover:brightness-110 transition duration-150 transfrom hover:scale-105 cursor-pointer ml-1"
          >
            {
              imageToPost && <img width={100} height={100} src={imageToPost} />
            }
            <p className="text-xs text-red-500 text-center font-bold">{imageToPost ? 'Remove' : ''}</p>
          </div>
        )}
      </div>
      <div className="flex item-center justify-center my-3 mx-2">
        <div
          className="flex flex-col items-center sm:flex-row hover:bg-gray-300
            		px-2 py-2 rounded-md cursor-pointer"
          onClick={() => {
            fileRef.current.click();
          }}
        > */}
        {/* <PhotoIcon className="text-normal text-green-500" /> */}
        {/* <p className="font-semibold text-gray-600 text-sm">
            Photo/Video
          </p>
          <input
            ref={fileRef}
            onChange={addPost}
            id="file-input"
            type="file"
            hidden
          />
        </div> */}
          </div>
          <div className="my-3 flex justify-center ">
        <select
          ref={hashRef}
          className="rounded-md border-black border-[1px] p-1"
          >
          {programmingLanguages.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
          </div>
    </div>
  );
};

export default Inputbox;
