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
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());


app.use("/", userRoute);
app.use("/post", taskRoute);




if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  console.log(__dirname)
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/assets", "index.html"));
  });
}

app.listen(PORT, async () => {
  console.log(`server is running on ${PORT}`);
  db();
});
