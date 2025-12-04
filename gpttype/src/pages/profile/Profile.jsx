import React, { useState } from 'react'
import { useauthstore } from '../../Auth/Authcontroller'
import { FaCamera } from "react-icons/fa";
import "./profile.css"
import { usechatstore } from '../../Auth/messages';

export const Profile = () => {
    const {profile,isupdatingprofile,authUser} = useauthstore();
    const {Users} = usechatstore()
    const [selectimages, setSelectimages] = useState(null);



    const handleimage = (e)=>{
        const file = e.target.files[0];
        console.log(file);

        if(file){
            const reader = new FileReader();
            reader.readAsDataURL(file);
        reader.onload = async()=>{
            const basew64Images = reader.result;
            setSelectimages(basew64Images);
            await profile({profilepic: basew64Images})

        }
        }

    }
    const user = Users?.users?.[0];
  return (
   <div className="container">
    <div className="profile-form mt-7">
        <div className="header p-3 flex  flex-col ">
            <div className="image" >
                <div className="porfie-image">
                    <img  src={selectimages || authUser?.profile?.profilepic || "./profile.jfif"} alt="abcd" />
                </div>
              
            </div>
              <div className="name flex flex-col justify-center mt-3">
                    <h2 style={{fontWeight:"500",color:"#000"}}>{authUser.fullname}</h2>
                </div>
                <div className="email">
                    <h3>{authUser.email} </h3>
                </div>
            
            <div style={{textAlign:"center", borderRadius:"1rem"}} className="change-pp mt-5 border flex justify-center p-2">
                <label htmlFor="" className=' '>
                    <input type="file" 
                    accept='image/*' 
                    className='flex'
                    disabled={isupdatingprofile}  
                    onChange={handleimage} />
                </label>
            </div>

            <div className="profile-status">
                <div className="account-inf">
                    <span>Account-since:</span>
              {/* <span className='ml-5'>{user.createdAt?.split(".")[0] || '...loading'}</span> */}
                </div>
                <div>
                    <span>account-status:</span>
                    <span className='ml-5' style={{color:"green"}}>active</span>
                </div>


            </div>
      
             </div>
    </div>
   </div>
  )
}

export default Profile
