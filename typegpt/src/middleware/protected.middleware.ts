import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { envconfig } from "../config/env.config.ts";
import User from "../entities/user.entities.ts";


declare module "express-serve-static-core" {
  interface Request {
    user?: Omit<User, "password">;
  }
}


const protectedRoute=async (req:Request,res:Response,next:NextFunction)=>{
try{
    const token = req.cookies.jwt;
    console.log("the token is " +token)

    if(!token){
        return res.status(401).json({success:false,message: "unauthorized token"})
    }

    const decode = jwt.verify(token,envconfig.JWT_SECRET!);

    if(!decode){
        return res.json({success:false,message:"cannnot decode the token"});
    }
    const {userid} = decode as {userid: number};

    const user = await User.findOne({
        where:
        {
            id:userid

        },
        select: 
        ["id","fullname","email"]
        
});

    if(!user){
        return res.json({success:false,message: "user dosent exist"})
    }

     req.user = user;

    
   return next();

}catch(err){
    console.error("the error is "+err);
    res.status(200).json({success:false,message:"internal server error"})
}


};
export default protectedRoute;