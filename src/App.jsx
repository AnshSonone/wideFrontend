import React, {useEffect} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { LoginStatus } from '../app/features/userSlice'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ProtectedRoute from "./hooks/ProtectedRoute"
import Home from './Pages/Home'
import Search from "./Pages/Search"
import AnswerUser from "./Pages/AnswerUser"
import Profile from "./Pages/Profile"
import User from "./Pages/User"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Activate from './Pages/Activate'
import ForgotPassword from './Pages/ForgotPassword'
import ResetPasword from './Pages/ResetPasword'
import API_BASE_URL from './config'




function App() {

  return (
    <Router>
      <Routes>
      {/* PRIVATE ROUTE */}
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Home />}/>
          <Route path='/profile' element={<Profile />} />
          <Route path='/answered/:id' element={<AnswerUser />}/>
          <Route path='/search/:param' element={<Search />} />
          <Route path='/user/:id' element={<User />}/>
        </Route>


        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/api/users/activate/:uid/:token' element={<Activate />} />
        <Route path='/forgot' element={<ForgotPassword />} />
        <Route path='/api/users/reset/:uid/:token' element={<ResetPasword />}/>
      </Routes>
    </Router>
  )
}

export default App
