import React from "react";

const UserInfo = ({ username, avatar, bio }) => {
  return (
    <div className="bg-gray-100 py-5 px-5 flex items-center w-full  space-x-2 my-4 shadow-md">
      <div className="flex flex-col justify-center items-center ">
        <div className="">
          <img
            className="rounded-full"
            src={`https://res.cloudinary.com/da25rozpm/${avatar}.png`}
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
        <p className="">{bio}</p>
      </div>
    </div>
  );
};

export default UserInfo;
