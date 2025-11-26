// imports
import express from "express";
import path from "path";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/UserRouter";
import userBookingRouter from "./routes/UserBookingRouter";
import paymentRouter from "./routes/PaymentRouter";
const app = express();
// MIDDLEWARE
// For Stripe webhooks, we need the raw body, so we have a custom middleware for it
app.use(express.json({
    verify: (req, res, buf) => {
        // Save the raw body to a new property on the request object
        req.rawBody = buf;
    }
}));
app.use(express.static(path.join(__dirname, "public")));
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/bookings", userBookingRouter);
app.use("/payments", paymentRouter);
export default app;
//# sourceMappingURL=server.js.map