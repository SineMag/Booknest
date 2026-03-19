import { Router } from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookingById,
  getBookingByUserId,
  updateBooking,
} from "../controllers/bookingController";

const router = Router();

router.get("/test", (req, res) => res.send("Hello Booking!"));
router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.get("/user/:id", getBookingByUserId);
router.post("/", createBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

export default router;
