import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import "./home.css"
import Nochatselected from '../../components/nochatselected/Nochatselected'
import { usechatstore } from '../../Auth/messages'
import Chatcomponent from '../../components/chat-component/Chatcomponent'

const Home = () => {
  const {selectedUsers} = usechatstore()
  return (
    <div className='page-container'>
      <div className="page-content">
        <div className="chat-card">
          <div className="chat-container">
            <Sidebar/>
            {!selectedUsers ? < Nochatselected  /> : <Chatcomponent/> }
           
          </div>
        </div>
      </div>
      
      
    </div>
  )
}

export default Home
