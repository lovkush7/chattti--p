import React, { useRef } from 'react'
import Chatheader from '../chat-header/Chatheader'
import Chatinput from '../chat-input-container/Chatinput'
import { usechatstore } from '../../Auth/messages'
import { useauthstore } from '../../Auth/Authcontroller'

const Chatcomponent = () => {
  const {messages,selectedUsers,ismessageloadig,getmessages} = usechatstore();
  const {authUser}=useauthstore();
  const messageEndref = useRef();
  return (
    <div style={{display:"flex",flexDirection:"column",flex:"1",overflow:"auto",}}>
        <Chatheader/>
         <div className="chat-messages">
          {messages.map((message)=>(
            <div key={message.id} 
          className={`chat ${message.senderId ===authUser.id ? "chat-end" : "chat-start" }` }
          ref={messageEndref} >
            <div className="chat-image-avatar">
              
            </div>


            </div>
          ))}
         </div>
        <Chatinput/>
      
    </div>
  )
}

export default Chatcomponent
