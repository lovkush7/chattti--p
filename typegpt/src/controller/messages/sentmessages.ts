import type { Request, Response } from "express";
import { cloudinary } from "../../lib/cloudnary.ts";
import { Messages } from "../../entities/messages.entities.ts";
import type User from "../../entities/user.entities.ts";

class SendMessages {
    async send(req:Request,res: Response){
        try{
            const {images,text} =req.body;
            const {id: reciverId} = req.params;

            const senderId = req.user?.id;
            if(!senderId){
              return res.status(401).json({success: false, messages: "unautorize user"})
            }
            let imagesurl;
            if(images){
                const uploadrsponse = await cloudinary.uploader.upload(images);
                imagesurl = uploadrsponse.secure_url;
            }

            //create message
            const messages = new Messages();
            messages.sender = {id: senderId} as unknown as User;
            messages.reciver = { id: reciverId } as unknown as User;
            messages.text = text;
            if(imagesurl){
                messages.images = imagesurl
            }
            await messages.save()

          //socket function
          
          res.status(200).json({success:true, messages})


        }catch(err){
            console.log("the error is "+err);
            
        }
    }
}
export default new SendMessages();