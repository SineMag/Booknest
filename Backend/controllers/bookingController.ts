import type { Request, Response } from "express";
import {
  createBookingDB,
  deleteBookingDB,
  selectAllBookingsDB,
  selectBookingByIdDB,
  selectBookingByUserIdDB,
  updateBookingDB,
} from "../services/bookingService";
import { log } from "console";
import type { Booking } from "../models/Booking";

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await selectAllBookingsDB();
    res.status(200).json(bookings);
  } catch (error) {
    log(error);
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const booking = await selectBookingByIdDB(id);
    res.status(200).json(booking);
  } catch (error) {
    log(error);
  }
};

export const getBookingsByUserId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const bookings = await selectBookingByUserIdDB(id);
    res.status(200).json(bookings);
  } catch (error) {
    log(error);
  }
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = req.body as Booking;
    const newBooking = await createBookingDB(booking);
    res.status(201).json(newBooking);
  } catch (error) {
    log(error);
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    console.log(2019, id);
    const accomodationBody = req.body as Booking;
    console.log(2020, accomodationBody);
    const accomodation = await updateBookingDB(id, accomodationBody);
    console.log(2021, accomodation);
    res.status(200).json(accomodation);
  } catch (error) {
    log(error);
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await deleteBookingDB(id);
    res.sendStatus(204);
  } catch (error) {
    log(error);
  }
};
