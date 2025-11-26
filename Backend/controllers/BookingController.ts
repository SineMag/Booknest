import type { Request, Response } from "express";
import {
  selectAllBookings,
  selectBookingById,
  selectBookingsByUserId,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../services/BookingService";
import { log } from "node:console";

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await selectAllBookings();
    return res.json(bookings);
  } catch (error) {
    log(error);
    return res.status(500).json({ message: "Error retrieving bookings" });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const booking = await selectBookingById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.json(booking);
  } catch (error) {
    log(error);
    return res.status(500).json({ message: "Error retrieving booking" });
  }
};

export const getBookingsByUserId = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const bookings = await selectBookingsByUserId(userId);
    return res.json(bookings);
  } catch (error) {
    log(error);
    return res.status(500).json({ message: "Error retrieving user bookings" });
  }
};

export const createNewBooking = async (req: Request, res: Response) => {
  try {
    const { userId, hotelId, checkInDate, checkOutDate, numberOfGuests, totalPrice, status } = req.body;
    const newBooking = await createBooking({
      userId,
      hotelId,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      numberOfGuests,
      totalPrice,
      status: status || "pending",
    });
    return res.status(201).json(newBooking);
  } catch (error) {
    log(error);
    return res.status(500).json({ message: "Error creating booking" });
  }
};

export const updateExistingBooking = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { userId, hotelId, checkInDate, checkOutDate, numberOfGuests, totalPrice, status } = req.body;
    const updatedBooking = await updateBooking(id, {
      userId,
      hotelId,
      checkInDate: checkInDate ? new Date(checkInDate) : undefined,
      checkOutDate: checkOutDate ? new Date(checkOutDate) : undefined,
      numberOfGuests,
      totalPrice,
      status,
    });
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.json(updatedBooking);
  } catch (error) {
    log(error);
    return res.status(500).json({ message: "Error updating booking" });
  }
};

export const deleteExistingBooking = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deletedBooking = await deleteBooking(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    log(error);
    return res.status(500).json({ message: "Error deleting booking" });
  }
};
