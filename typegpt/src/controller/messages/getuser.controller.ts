import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../../Types/Authenticatereq.ts";
import User from "../../entities/user.entities.ts";
// import { string } from "joi";


class GetUser{
    async getusers(req:Request,res:Response){
        try{
            const loggedinuser = req.user?.id;
            console.log("loggedinuser:", loggedinuser);


          const filtereduser = await User
          .createQueryBuilder("u")
        .where("u.id != :id",
            {id: String(loggedinuser)})
          .select([
               "u.id",
           "u.fullname",
               "u.email",
           "u.profile",
            "u.createdAt",
        ]).getMany();
          

        return res.status(200).json({success:true,users:filtereduser});



        }catch(err){
            console.error("the error is"+err);
        }

    }
}
export default new GetUser();