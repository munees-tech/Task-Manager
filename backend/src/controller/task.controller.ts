import { Request, Response } from "express";
import Task from "../model/task.model";
import User from "../model/user.model";
import mongoose from "mongoose";

interface AuthRequest extends Request {
  user?: any;
}

export const postTaskController = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content } = req.body as {
      title: string;
      content: string;
    };

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Please fill the Title And Content" });
    }

    const newTask = await Task.create({
      title,
      content,
      userId: req.user._id,
    });

    res.status(200).json({ newTask });
  } catch (error) {
    console.log(`error in posttaskcontroller ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body as {
      title?: string;
      content?: string;
    };

    if (!title && !content) {
      return res
        .status(400)
        .json({ message: "Please provide title or content to update" });
    }

    const updateData: any = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;

    const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
      returnDocument: 'after',
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ updatedTask });
  } catch (error) {
    console.log(`error in updatetaskcontroller ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTaskController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const tasks = await Task.find({ userId });
    res.status(200).json({ tasks });
  } catch (error) {
    console.log(`error in gettaskcontroller ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"Task deleted succesfully"});
  } catch (error) {
    console.log(`error in deletetaskcontroller ${error}`);
    res.status(500).json({ message: "Internel server error" });
  }
};
