import type { NextFunction, Request, Response } from "express";
import joi from "joi";

const signupvalidation = (req:Request,res:Response, next:NextFunction)=>{

    const schema = joi.object({
        fullname: joi.string().min(1).max(10).required(),
        email: joi.string().email().required(),
        password: joi.string().min(3).max(10).trim().required()
    });
    const {error }= schema.validate(req.body);

    if(error){
        return res.status(400).json({success: false,message: "validation error "})
    }
    next();
}
export default signupvalidation;