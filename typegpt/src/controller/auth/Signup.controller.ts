import type { Request, Response } from "express";
// import User from "../entities/user.entities.ts";
import bcrypt from "bcrypt"
import { generateToken } from "../../lib/jwt.cookies.ts";
import User from "../../entities/user.entities.ts";

const Signup = async(req:Request,res:Response)=>{
  const {fullname,email,password} = req.body;
  try{
    const user = await User.findOne({
        where:{
            email
        }
    });
    if(user){
        return res.status(400).json({success: false, message: "user already exist so you can login"})
    };
  
     const usermodel = new User()
     usermodel.fullname= fullname,
     usermodel.email = email,
     usermodel.password = password

     await usermodel.save()
  
     generateToken(res,usermodel.id);
     res.status(200).json({
        success:true,
        fullname:usermodel.fullname,
        email: usermodel.email,
        createdAt:usermodel.createdAt,
        message: "successfully signedup"
     })




  }catch(err){
    console.error("the error is "+err);
    res.status(400).json({success:false,message:"internal server error"})
  }
}

export default Signup;