import React from 'react'
import { useauthstore } from '../../Auth/Authcontroller';
import { Link } from 'react-router-dom';
import { IoSettings } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import "./navbar.css";

const Navbar = () => {
    const {authUser,logout} = useauthstore();
  return (
    <div className='navbar'>
        <div className="nav-left">
          <h2 style={{fontFamily:"inherit", color:"rgb(70, 68, 68)"}}>Guff_Gaff</h2>
        </div>
        <div className="nav-right">
            {authUser && (
                <>
                <div className="right" style={{display:"flex",alignItems:"center",justifyContent:"end", gap:"5rem"}}>
                <div className="setting">
                    <Link to={"/setting"}>
                    <IoSettings />
                    </Link>
                </div>
                <div className="logout">
                    <button className='btn' onClick={logout} >
                       <IoMdLogOut  style={{fontSize:'20px'}}/>
                    </button>
                </div>
                </div>
                </>
            )
            
            }

        </div>
      
    </div>
  )
}

export default Navbar;
