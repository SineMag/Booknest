// imports
import express from "express";
import path from "path";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";

const app = express();

// MIDDLEWARE
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use("/auth", authRouter);
app.use("/users", userRouter);

export default app;
