import { MessagesSquare } from 'lucide-react'
import React from 'react'
import "./Nochatselected.css"

const Nochatselected = () => {
  return (
    <div className='no-chat-selected'>
        <div className="content">
            <div className="icon-wrapper">
                <div className="icon-container">
                    <MessagesSquare style={{width:"2rem" , height:"2rem"}}/>
                </div>
            </div>
               <h2 className="chat-title">welcome to chat</h2>
               <p className="chat-p">
                please select the user form sidebar
               </p>
            </div> 
      
    </div>
  )
}

export default Nochatselected
