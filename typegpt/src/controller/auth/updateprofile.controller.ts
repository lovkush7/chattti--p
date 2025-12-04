import type { Request, Response } from "express";
import { cloudinary } from "../../lib/cloudnary.ts";
import{  Profile } from "../../entities/Profile.entities.ts";
import User from "../../entities/user.entities.ts";
import type { AuthenticatedRequest } from "../../Types/Authenticatereq.ts";
// import { profile, profile } from "console";


const uploadprofilepic = async (req:AuthenticatedRequest,res:Response)=>{
    try{
        const {profilepic} =req.body;

        const userid = req.user?.id;

        if(!userid){
            return res.status(401).json({success:false, message: "unauthorized user"})
        }

        if(!profilepic){
            return res.status(400).json({success:false,message:"profile pic is required"})
        }
           
         const uploadresponse = await cloudinary.uploader.upload(profilepic);
         const user = await User.findOne({
            where:{
                id: userid
            },
            relations:["profile"]

         });
         if(!user){
            return res.status(400).json({success: false,message: "USER NOT FOUND"})
         }
         if(user.profile){
            user.profile.profilepic= uploadresponse.secure_url;
            await user.profile.save();
            return res.status(200).json({success: true,message:"profile pic updated successfully", profile:user.profile})
         }else{
            const profile = new Profile();
            profile.profilepic = uploadresponse.secure_url;
              await profile.save();
            user.profile = profile;
            await user.save()
         }
         return res.status(200).json({success: true,message: 'profile pic is uploaded successfully', profile:user.profile})
   


    }catch(err){
        console.log("the error is "+err);
        res.status(500).json({success: false,message:"INTERNAL SERVER ERROR "})
    }
}

export default uploadprofilepic;