import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    complited: Boolean,
  },
  { timestamps: true },
);

const Task = mongoose.model("Task", TaskSchema);

export default Task;
