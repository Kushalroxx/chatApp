import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../prisma/db";
import jwt  from "jsonwebtoken";

export const loginControler = async(req:Request, res:Response)=>{
    const emailSchema = z.string().email()
    const { email } = req.body
    if(!email){
        return res.status(400).json("email is a non empty field")
    }
    const validEmail = emailSchema.safeParse(email)
    if(validEmail.success!=true){
        return res.status(400).json("email is not valid")
    }
    try {
        const user = await prisma.$transaction(async(tx)=>{
            let user = await tx.user.findFirst({
                where:{
                    email:email
                }
            })
            if(!user){
                user = await tx.user.create({
                    data:{
                        email:email
                    }
                })
            }
            return user
        })
        const token = jwt.sign({email:user.email,id:user.id},"secret")
        await prisma.user.update({
            where:{
                email:user?.email
            },
        data:{
            session:token
        }})
        res.cookie("token", token,{httpOnly:true,sameSite:"lax"})
        return res.status(201).json({user:{email:email,token:token},message:"User created"})
    } catch (error) {
        return res.status(500).json({message:"Something went wrong while login"})
    }
}