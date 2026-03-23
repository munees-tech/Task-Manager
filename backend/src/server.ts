import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { db } from "./db/db";
import userRoute from "./routes/user.route";
import cookieParser from "cookie-parser";
import taskRoute from "./routes/task.route";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "",
    credentials: true,
  }),
);
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());


app.use("/", userRoute);
app.use("/post", taskRoute);


app.listen(PORT, async () => {
  console.log(`server is running on ${PORT}`);
  db();
});
