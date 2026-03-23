import express from "express";
import {
  getMe,
  loginController,
  logoutController,
  signupController,
} from "../controller/user.controller";
import { productRoute } from "../middlewere/protect.route";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/me", productRoute, getMe);

export default router;
