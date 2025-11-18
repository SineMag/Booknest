import express from "express";
import dotenv from "dotenv";
import { userTableQuery } from "./models/User";
import userRouter from "./routes/UserRouter";
dotenv.config();

const app = express();
const PORT = process.env.PORT!;

// middleware
app.use(express.json());
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello, Booknest Backend is running!");
});

const startServer = async () => {
  await userTableQuery();
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};

startServer();
