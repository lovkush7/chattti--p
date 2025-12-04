import type { Request, Response } from "express";
import userServices from "../../Services/user.services.ts";
import User from "../../entities/user.entities.ts";


class Usercontroller {
    async logout(req:Request,res:Response){
     try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({success:true,message:"successfully logout"});

     }catch(err){
        console.log("the error is "+ err);
        res.status(403).json({success:false,message: 'internal server error'})
     }
    }

    async check (req:Request,res:Response){
      try{
         res.status(200).json(req.user);
    

      }catch(err){
         console.error("the error is "+err);
         res.status(500).json({success:false,message:"internal server error"})
      }
    }

}
export default new Usercontroller();