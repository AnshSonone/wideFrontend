'use client';

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Search, Logout, selectorSearch } from "@/features/searchSlice";
import axios from "axios";
// import { logout, selectUser } from "@/features/userSlice";


const Navbar = ({ findSearch }) => {

    const router = useRouter()
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectorSearch)
    const [search, setSearch] = useState('')


    const handleLogout = async () => {

        const token = Cookies.get('accessToken')
        const res = await axios.post(`http://localhost:8000/api/users/logout/`,
          {
            headers: {
                Authorization: `Bearer ${token}`
            }
          }
        )
        Cookies.remove('accessToken')
        localStorage.removeItem('accessToken')
        Cookies.remove('refreshToken')
        Cookies.remove('csrftoken')
        localStorage.removeItem('refreshToken')
        dispatch(Logout())
        console.log(res.data)
        router.push('/Login')
    }


    useEffect(() => {
        dispatch(Search(search))
    }, [search])

    return (<>
        <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <Link href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Wide</span>
                </Link>
                <form className="bg-white py-2 px-4 rounded-md mt-1 " onSubmit={findSearch}>
                    <input
                        className="outline-none font-bold w-[85%]"
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="outline-none font-semibold" type="submit">Find</button>
                </form>
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                <div className="">
                    <span className="text-white ">Hey, {user?.username}</span>
                </div>
                    <button onClick={handleLogout} className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Logout</button>
                </div>
            </div>
        </nav>
        <nav className="bg-gray-50 dark:bg-gray-700 sticky top-[8%]">
            <div className="max-w-screen-xl px-4 py-3 mx-auto">
                <div className="flex items-center">
                    <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                        <li>
                            <Link href={'/'} className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link href={'/Profile'} className="text-gray-900 dark:text-white hover:underline">Profile</Link>
                        </li>
                        <li>
                            <Link href="#" className="text-gray-900 dark:text-white hover:underline">Team</Link>
                        </li>
                        <li>
                            <Link href="#" className="text-gray-900 dark:text-white hover:underline">Features</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
    )
};

export default Navbar;