import { Response } from "express";
import jwt from "jsonwebtoken";

export const gendreateToken = async (userId:any , res:Response) => {
    try {
        const token = await jwt.sign({id:userId},process.env.JWT_SECREATE! ,{
            expiresIn:"7d"
        });
        if(!token) {
            return res.status(401).json({message:"unauthorized"});
        }
        res.cookie("jwt" , token ,{
            maxAge:7 * 60 * 60 * 1000,
            httpOnly:true,
            sameSite : "none",
            secure:true
        });
    } catch (error) {
        console.log(`error in gendreate token ${error}`);
        return res.status(500).json({ message: "Failed to create token" });
    }
}