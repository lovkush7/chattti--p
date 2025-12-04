import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import { useauthstore } from './Auth/Authcontroller'
import Navbar from './components/navbar/Navbar'
import Setting from './pages/setting/Setting'
import { usechatstore } from './Auth/messages'
import Profile from './pages/profile/Profile'

const App = () => {
const {check,authUser,isCheckingauth} = useauthstore();
const {getusers,Users} = usechatstore();
useEffect(()=>{
  check()
  getusers()
},[check,getusers])
 console.log("auth user:", authUser);
 console.log("users",Users)

 const navigate = useNavigate();

 if(isCheckingauth){
  return <div>Loading ....</div>
 }
  return (
    <div>
    <Navbar/>

      <Routes>
        <Route path='/' element={authUser ? <Home/> : <Navigate to={"/login"}/>  } />
        <Route path='/login' element={!authUser ? <Login/> : <Navigate to={"/"}/>  }/>
        <Route path='/signup' element={!authUser ? <Signup/> : <Navigate to={"/login"}/> }/>
        <Route path="/setting" element={<Setting/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
    </div>
  )
}

export default App
