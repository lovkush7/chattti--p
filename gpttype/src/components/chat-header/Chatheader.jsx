import React from 'react'
import { usechatstore } from '../../Auth/messages'
import { useauthstore } from '../../Auth/Authcontroller';
import "./Chatheader.css";

const Chatheader = () => {
  const {Users,setselecteduser,selectedUsers} = usechatstore();
  const {Onlineuser} =useauthstore()
  return (
    <div className='chat-header'>
      <div className="chat-header-inner">
        <div className="chat-user">
          <div className="avtar">
            <img src={selectedUsers?.profile?.profilepic || "./profile.jfif"} alt={selectedUsers.fullname} />
          </div>
          <div>
          <h3 className="user-name">
            {selectedUsers.fullname}
          </h3>
          
          <p className="user-status">
            {Onlineuser.includes(selectedUsers.id) ? "online" : "offline"}
          </p>
          </div>
        </div>
        <button style={{border:"none",outline:"none"}} onClick={()=>setselecteduser(null)} >X</button>
      </div>


      
    </div>
  )
}

export default Chatheader
