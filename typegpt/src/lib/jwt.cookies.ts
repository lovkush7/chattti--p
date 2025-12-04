import type { Response } from "express";
import jwt from 'jsonwebtoken';
import { envconfig } from "../config/env.config.ts";

export const generateToken =(res:Response,userid: string | number)=>{

    const token =  jwt.sign({userid}, 
        envconfig.JWT_SECRET!,
        {expiresIn:"7d"}  
    );
    
            console.log("userid received in generatetoken:", userid);

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        secure: false,
        sameSite: "lax",
       

    });
    return token;
}

