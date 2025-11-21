// imports
import express from "express";
import path from "path";
import authRouter from "./routes/authRouter";
<<<<<<< HEAD
import userRouter from "./routes/UserRouter";
=======
import userRouter from "./routes/userRouter";
>>>>>>> feat/ReviewCard
const app = express();
// MIDDLEWARE
app.use(express.static(path.join(__dirname, "public")));
app.use("/auth", authRouter);
app.use("/users", userRouter);
export default app;
//# sourceMappingURL=server.js.map