import { Router } from "express";
import { UserBookingController } from "../controllers/UserBookingController";

const router = Router();

router.post("/bookings", UserBookingController.createBooking);
router.get("/bookings/:id", UserBookingController.getBookingsByUserId);
router.put("/bookings/:id/status", UserBookingController.updateBookingStatus);

export default router;