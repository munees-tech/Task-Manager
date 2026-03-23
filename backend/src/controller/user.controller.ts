import { Request, Response } from "express";
import User from "../model/user.model";
import { gendreateToken } from "../utils/gendreate.token";
import bcrypt from "bcrypt";

interface AuthRequest extends Request {
  user?: any,
  body:any,
  cookies:any
}

export const signupController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as {
    name: string;
    email: string;
    password: string;
  };
  const user = await User.findOne({ name });
  if (user) {
    return res.status(400).json({ message: "user already exists" });
  }
  const salt: string = await bcrypt.genSalt(10);
  const hasPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({
    name,
    email,
    password: hasPassword,
  });
  await gendreateToken(newUser._id, res);
  return res.status(200).json({ newUser });
};

export const loginController = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const user = (await User.findOne({ email })) as any;
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(400).json({ message: "password wrong" });
    }

    await gendreateToken(user._id, res);
    return res.status(200).json({
      id: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.log(`Error in loginController ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutController = (req:Request , res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout succesfuly" });
  } catch (error) {
    console.log(`Error in logout controller ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
 try {
   const user = await User.findOne({ _id: req.user.id }).select("-password");
   res.status(200).json({user})
 } catch (error) {
   console.log(`Error in getme controller ${error}`);
   return res.status(500).json({ message: "Internal server error" });
 }
};
