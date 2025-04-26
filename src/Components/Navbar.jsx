import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "../../app/features/searchSlice";
import { LogoutStatus } from "../../app/features/userSlice";
import axios from "axios";


const Navbar = ({ findSearch }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = Cookies.get('accessToken')
    const user = useSelector((state) => state.user)
    const [search, setSearch] = useState('')

    const handleLogout = async () => {
        Cookies.remove('accessToken')
        localStorage.clear()
        Cookies.remove('csrftoken')
        dispatch(LogoutStatus())
        navigate('/login')
    }

    useEffect(() => {
        dispatch(Search(search))
    }, [search])

    useEffect(() => {
        user
    }, [])



    return (<>
        <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0">
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-between mx-4 max-w-screen-xl p-4">
                <div className="lg:block flex justify-center w-full space-x-3 rtl:space-x-reverse lg:w-fit">
                    {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
                <Link to={'/'}>
                    <span className="self-center md:text-2xl font-semibold whitespace-nowrap dark:text-white border-[1px] border-white p-1 rounded-md animate-flip-up">Wide</span>
                </Link>
                </div>
                <form className="bg-white flex items-center px-2 py-2 rounded-md my-1 w-full lg:w-[40%]" onSubmit={findSearch}>
                    <input
                        className="outline-none font-bold w-full"
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="outline-none font-semibold transition hover:scale-95 cursor-pointer duration-150" type="submit">Find</button>
                </form>
                <div className="flex items-center justify-between lg:justify-end space-x-6 px-2 w-full lg:w-fit">
                    <div className="">
                        <span className="text-white sm:font-bold flex">Hey, <strong className="ml-1">{user.data?.username}</strong></span>
                    </div>
                    <button onClick={handleLogout} className="sm:font-bold  text-blue-600 dark:text-blue-500 hover:underline cursor-pointer transition hover:scale-95 duration-150 ">Logout</button>
                </div>
            </div>
        </nav>
        <nav className="bg-gray-50 dark:bg-gray-700 sticky top-[17%] lg:top-[10%] xl:top-[12%]">
            <div className="max-w-screen-xl px-4 py-3 mx-auto">
                <div className="flex items-center">
                    <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                        <li>
                            <Link to={'/'} className="text-gray-900 dark:text-white hover:underline sm:font-bold sm:text-lg" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link to={'/Profile'} className="text-gray-900 dark:text-white hover:underline sm:font-bold sm:text-lg">Profile</Link>
                        </li>
                        <li>
                            <Link href="#" className="text-gray-900 dark:text-white hover:underline sm:font-bold sm:text-lg">Team</Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    </>
    )
};

export default Navbar;