// imports
import express from "express";
import path from "path";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/UserRouter";
import bookingRouter from "./routes/UserBookingRouter";
import paymentRouter from "./routes/PaymentRouter";
import cors from "cors";

const app = express();

// MIDDLEWARE
// For Stripe webhooks, we need the raw body, so we have a custom middleware for it
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
    methods: "*",
    allowedHeaders: "*",
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/bookings", bookingRouter);
app.use("/payments", paymentRouter);

export default app;
