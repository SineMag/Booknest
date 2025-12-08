import type { Request, Response } from "express";
import {
  createBookingDB,
  deleteBookingDB,
  selectAllBookingsDB,
  selectBookingByIdDB,
  updateBookingDB,
} from "../services/bookingService";
import { log } from "console";
import type { Booking } from "../models/Booking";

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId ? Number(req.query.userId) : undefined;
    const bookings = await selectAllBookingsDB(userId);
    res.status(200).json(bookings);
  } catch (error: any) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: error.message || "Failed to fetch bookings" });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid booking ID" });
    }
    const booking = await selectBookingByIdDB(id);
    if (!booking || booking.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error: any) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ error: error.message || "Failed to fetch booking" });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = req.body as Booking;
    
    // Validate required fields
    if (!booking.userId || !booking.accommodationId || !booking.checkInDate || !booking.checkOutDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newBooking = await createBookingDB(booking);
    res.status(201).json(newBooking);
  } catch (error: any) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: error.message || "Failed to create booking" });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid booking ID" });
    }
    const bookingBody = req.body as Booking;
    const updatedBooking = await updateBookingDB(id, bookingBody);
    if (!updatedBooking || updatedBooking.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(updatedBooking);
  } catch (error: any) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: error.message || "Failed to update booking" });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid booking ID" });
    }
    await deleteBookingDB(id);
    res.sendStatus(204);
  } catch (error: any) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: error.message || "Failed to delete booking" });
  }
};
