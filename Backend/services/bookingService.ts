import {
  createBookingQuery,
  deleteBookingQuery,
  getBookingByIdQuery,
  getBookingByUserIdQuery,
  getBookingsQuery,
  updateBookingQuery,
} from "../models/Booking";

export const selectAllBookingsDB = async () => {
  const bookings = await getBookingsQuery();
  return bookings;
};

export const selectBookingByIdDB = async (id: number) => {
  const booking = await getBookingByIdQuery(id);
  return booking;
};

export const selectBookingByUserIdDB = async (id: number) => {
  const bookings = await getBookingByUserIdQuery(id);
  return bookings;
}

export const createBookingDB = async (booking: any) => {
  const result = await createBookingQuery(booking);
  return result;
};

export const updateBookingDB = async (id: number, booking: any) => {
  const result = await updateBookingQuery(id, booking);
  return result;
};

export const deleteBookingDB = async (id: number) => {
  const result = await deleteBookingQuery(id);
  return result;
};
