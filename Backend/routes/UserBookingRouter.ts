import { Router } from "express";
import { UserBookingController } from "../controllers/UserBookingController";

const router = Router();

router.post("/bookings", UserBookingController.createBooking); // Create a new booking
router.get("/bookings", UserBookingController.getAllBookings); // Get all bookings
router.get("/bookings/user/:userId", UserBookingController.getBookingsByUserId); // Get all bookings for a specific user
router.get("/bookings/:id", UserBookingController.getBookingById); // Get a single booking by ID
router.put("/bookings/:id", UserBookingController.updateBooking); // Update a booking by ID (full update)
router.put("/bookings/:id/status", UserBookingController.updateBookingStatus); // Update a booking's status by ID
router.delete("/bookings/:id", UserBookingController.deleteBooking); // Delete a booking by ID

export default router;