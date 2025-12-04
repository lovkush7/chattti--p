import type { Request, Response } from "express";
import User from "../../entities/user.entities.ts";
import bcrypt from 'bcrypt';
import { generateToken } from "../../lib/jwt.cookies.ts";

const login = async(req: Request,res: Response)=>{


  const {name,email,password}= req.body;

  try{
    const user = await User.findOne({
        where: {
            email
        }
    });

    if(!user){
        return res.status(200).json({success: false, message: "user dosent exist"})
    }

    const ischeckingpass = await bcrypt.compare(password,user.password);

    if(!ischeckingpass){
           return res.status(200).json({success: false, message: "passsword is incorrect "})
    }
    generateToken(res,user.id);
    res.status(200).json({
        success: true,
        name: user.fullname,
        email: user.email,
        createdAt:user.createdAt,
    })

  }catch(err){
    console.log("the error is "+err);
    res.status(400).json({success:false , message: "inernal server error"})
  }


}
export default login