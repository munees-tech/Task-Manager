import jwt from "jsonwebtoken";
import User from "../model/user.model";
import { NextFunction, Request, Response } from "express";

interface AuthRequest extends Request {
  user?: any;
}

export const productRoute = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECREATE!,
    ) as jwt.JwtPayload;

    if (!decoded) {
      return res.status(400).json({ message: "unauthorized" });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "user not found !" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(`Error in productRoute ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};
