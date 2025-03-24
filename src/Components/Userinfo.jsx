import React from "react";
import image from "../asset/images.png"

const UserInfo = ({ username, avatar, bio }) => {
  return (
    <div className="bg-gray-100 py-5 px-5 w-[100%] flex space-x-2 mx-4 my-2 shadow-md">
      <div className="flex flex-col justify-center items-center ">
        <div className="">
          <img
            className="rounded-full"
            src={avatar == null ? avatar : image}
            width={60}
            height={60}
            alt="icon"
          />
        </div>
        <div>
          <strong className="my-2 text-xl">{String(username)[0].toUpperCase() + username?.slice(1,)}</strong>
        </div>
      </div>
      <div>
        <p className="text-xl">{bio}</p>
      </div>
    </div>
  );
};

export default UserInfo;
