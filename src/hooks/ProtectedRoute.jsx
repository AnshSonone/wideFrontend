import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {Navigate, Outlet, useNavigate} from "react-router-dom"
import Navbar from "../Components/Navbar"
import { useSelector } from "react-redux";
import { selectorSearch } from "../../app/features/searchSlice";
import API_BASE_URL from '../config'


export default function ProtectedRoute() {

    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const navigate = useNavigate()
    const search = useSelector(selectorSearch)

    useEffect(() => {
        refreshToken().catch(() => setIsAuthenticated(false))   
        auth().catch(() => setIsAuthenticated(false))
    }, [isAuthenticated])

    const clearToken = () => {
        Cookies.remove('accessToken')
        localStorage.getItem('refreshToken')
    }

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken')

        if (!refreshToken) {
            throw new Error('Refresh token is not available')
        }
        try{
            const res = await axios.post(
                `${API_BASE_URL}/api/token/refresh/`,
                {
                    refresh: refreshToken,
                }
            )

            if ( res.status == 200){
                clearToken()
                Cookies.set('accessToken', res.data.access)
                localStorage.setItem('refreshToken', res.data.refresh)
                setIsAuthenticated(true)
                return <Navigate to={'/'} />;
            }else {
                setIsAuthenticated(false)
                return <Navigate to={'/login'} />
            }
        }catch(error){
            console.log(error)
            setIsAuthenticated(false)
        }
    }

    const auth =  async () => {
        const token = Cookies.get('accessToken')

        if (token) {
            setIsAuthenticated(true)
            return <Navigate to={'/login'}/>;
        }

        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp * 1000
        const now = Date.now()

        if (tokenExpiration < now){
            await refreshToken();
        }else {
            setIsAuthenticated(true)
        }
    }

    const findSearch = async (e) => {
        e.preventDefault()
    
        navigate(`Search/${search}`)
    
    
      }


    if(isAuthenticated === null){
        return <div>Loading...</div>
    }

  return isAuthenticated ?
  <div>
    <Navbar findSearch={findSearch}/>
    <Outlet />
  </div> 
  :
  <Navigate to={'/login'} />

}
