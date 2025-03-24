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

        // const res = await axios.post(`http://localhost:8000/api/users/logout/`,
        //     {
        //         headers: {
        //             Authorization: `Bearer ${token}`
        //         }
        //     }
        // )
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
            <div className="flex flex-wrap justify-between items-center mx-4 max-w-screen-xl p-4 ">
                <Link href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
                    {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
                    <span className="self-center md:text-2xl font-semibold whitespace-nowrap dark:text-white">Wide</span>
                </Link>
                <form className="bg-white py-2 px-4 rounded-md my-1" onSubmit={findSearch}>
                    <input
                        className="outline-none font-bold w-[85%]"
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="outline-none font-semibold transition hover:scale-95 cursor-pointer duration-150" type="submit">Find</button>
                </form>
                <div className="flex items-center justify-between sm:justify-end space-x-6 w-[95%]  sm:w-[20%]">
                    <div className="">
                        <span className="text-white sm:font-bold">Hey, {user.data?.username}</span>
                    </div>
                    <button onClick={handleLogout} className="sM;font-bold  text-blue-600 dark:text-blue-500 hover:underline cursor-pointer transition hover:scale-95 duration-150 ">Logout</button>
                </div>
            </div>
        </nav>
        <nav className="bg-gray-50 dark:bg-gray-700 sticky top-[22%] sm:top-[10%]">
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