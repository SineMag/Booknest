import {
  Booking,
  getAllBookingsQuery,
  getBookingByIdQuery,
  getBookingsByUserIdQuery,
  insertBookingQuery,
  updateBookingQuery,
  deleteBookingQuery,
} from "../models/Booking";

export const selectAllBookings = async () => {
  const bookings = await getAllBookingsQuery();
  return bookings;
};

export const selectBookingById = async (id: number) => {
  const booking = await getBookingByIdQuery(id);
  return booking;
};

export const selectBookingsByUserId = async (userId: number) => {
  const bookings = await getBookingsByUserIdQuery(userId);
  return bookings;
};

export const createBooking = async (booking: Booking) => {
  const newBooking = await insertBookingQuery(booking);
  return newBooking;
};

export const updateBooking = async (id: number, booking: Partial<Booking>) => {
  const updatedBooking = await updateBookingQuery(id, booking);
  return updatedBooking;
};

export const deleteBooking = async (id: number) => {
  const deletedBooking = await deleteBookingQuery(id);
  return deletedBooking;
};
