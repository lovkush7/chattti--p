import React, { useEffect } from 'react'
import { usechatstore } from '../../Auth/messages'
import { FaUsersCog } from 'react-icons/fa';
import {User2, Users2} from "lucide-react"
import { useauthstore } from '../../Auth/Authcontroller';
import "./sidebar.css"

const Sidebar = () => {
    const {Users,selectedUsers,isuserloading,getusers,setselecteduser} = usechatstore();
    const{Onlineuser,authUser} = useauthstore();

    useEffect(()=>{
        getusers()
    },[getusers]);

    if(isuserloading){
      return  <div>loading....</div>
    }
  return (
    <aside className='sidebar'>
    <div className='sidebar-header'>
        <div className="header-content">
            <Users2 className='user-icons'/>
            <span style={{fontWeight:"500"}}className="header-title">
                contracts
            </span>
        </div>
      
    </div>
    <div className="sidebar-body">
        {Users?.map((user)=>(
            <button key={user.id} 
            onClick={()=>setselecteduser(user)}
            className={`user-button ${selectedUsers?.id === user.id ? "active" : ""}`}
            >
                <div className="user-profile">
                    <img src={authUser.profile.profilepic || "./profile.jfif"} alt={user.fullname} className='profile-img'/>
                    {Onlineuser.includes(user.id) && (
                        <span className="online-indicator">

                        </span>
                    )}

                </div>
                <div className="user-info-container">
                    <div className="user-full-name">
                        {user.fullname}
                    </div>
                    <div className="user-status">
                        {Onlineuser.includes(user.id) ? "active" : "offline"}
                    </div>
                </div>

            </button>
        ))}
    </div>
    </aside>
  )
}

export default Sidebar
