import express from "express";
import { productRoute } from "../middlewere/protect.route";
import {
  deleteTaskController,
  getTaskController,
  postTaskController,
  updateTaskController,
} from "../controller/task.controller";

const router = express.Router();

router.post("/task", productRoute, postTaskController);
router.put("/update/task/:id", productRoute, updateTaskController);
router.get("/get/task/:userId", productRoute, getTaskController);
router.delete("/:id", productRoute, deleteTaskController);

export default router;
