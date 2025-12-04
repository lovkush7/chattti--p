import type { Request, Response } from "express";
import { Messages } from "../../entities/messages.entities.ts";

class GetMessages {
    async getchat (req:Request, res:Response){
        try{
            const {id: usertochat} = req.params;

            const myid = req.user?.id;

            if(!myid){
                return res.status(401).json({success:false,message:'unauthorezed'})
            }

            const messages = await Messages.createQueryBuilder("m")
            .where("(m.senderId = :myid AND m.reciverId = :usertochat )OR (m.senderId = :usertochat AND m.reciverId = :myid)"
                ,{myid,usertochat }
            ).orderBy("m.createdAt","ASC")
            .getMany();

            res.status(200).json({success:true, messages})

        }catch(err){
            console.error("the error is "+err);
            res.status(500).json({success: false,message: "internal server error "})
        }

    }
}
export default new GetMessages();