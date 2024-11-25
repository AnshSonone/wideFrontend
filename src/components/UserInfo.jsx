import Image from "next/image";

const UserInfo = ({username, avatar, bio}) => {
    return (
        <div className='bg-gray-100 py-10 px-5 w-[100%]'>
                        <div className='flex flex-col justify-center items-center '>
                            <div className='rounded-full'>
                             <Image
                             src={avatar}
                             width={100}
                             height={100}
                             alt="icon"
                             />
                            </div>
                            <div>
                                <strong className='font-semibold text-xl'>{username}</strong>
                            </div>
                            <div>
                                <p>{bio}</p>
                            </div>
                        </div>
                    </div>
    )
}

export default UserInfo;