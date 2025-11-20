// imports
import express from "express";
import dotenv from "dotenv";
import { userTableQuery } from "./models/User";
import cors from "cors";
import PaymentRouter from "./routes/PaymentRouter";

// import routes
import userRouter from "./routes/UserRouter";
import authRouter from "./routes/authRouter";

// setup
dotenv.config();
const app = express();
const PORT = process.env.PORT!;

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use('/payments', PaymentRouter);

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
