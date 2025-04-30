import React from "react";

const UserInfo = ({ username, avatar, bio }) => {

  return (
    <div className="bg-gray-100 p-5 space-x-2 my-2 shadow-md">
      <div className="place-items-center space-y-1 mb-2">
      <img
            className="rounded-full"
            src={`https://res.cloudinary.com/da25rozpm/${avatar}.png`}
            width={'100px'}
            alt="icon"
          /> 
          <strong className="my-2 text-xl">{String(username)[0].toUpperCase() + username?.slice(1,)}</strong>
      </div>
      <p className="text-center">{bio}</p>
    </div>
  );
};

export default UserInfo;
