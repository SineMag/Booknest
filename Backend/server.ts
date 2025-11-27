// imports
import express from "express";
import path from "path";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import accomodationRouter from "./routes/accomodationRouter";
import cors from "cors";
import paymentRouter from "./routes/paymentRouter";
import { userTableQuery } from "./models/User";
import { accomodationTableQuery } from "./models/Accomodation";
const app = express();

// MIDDLEWARE
// For Stripe webhooks, we need the raw body, so we have a custom middleware for it
app.use(express.json());
app.use(
  express.json({
    verify: (req, res, buf) => {
      // Save the raw body to a new property on the request object
      (req as any).rawBody = buf;
    },
  })
);
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/payments", paymentRouter);
app.use("/accomodations", accomodationRouter);

// INITIALISE DATABASE
async function initializeDatabase() {
  await userTableQuery();
  console.log("user table created");
  await accomodationTableQuery();
  console.log("accomodation table created");
}
initializeDatabase();

export default app;
