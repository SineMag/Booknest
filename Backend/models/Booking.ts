import { sql } from "../database";

export interface Booking {
  id?: number;
  userId: number;
  hotelId: number; // Assuming a hotel ID
  checkInDate: Date;
  checkOutDate: Date;
  numberOfGuests: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt?: Date;
}

export const bookingTableQuery = () => sql`
  CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL REFERENCES users(id),
    hotelId INTEGER NOT NULL, -- Assuming a hotels table will exist and be referenced
    checkInDate DATE NOT NULL,
    checkOutDate DATE NOT NULL,
    numberOfGuests INTEGER NOT NULL,
    totalPrice NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`;

export const getAllBookingsQuery = () => sql`
  SELECT * FROM bookings;`;

export const getBookingByIdQuery = (id: number) => sql`
  SELECT * FROM bookings WHERE id=${id};`;

export const getBookingsByUserIdQuery = (userId: number) => sql`
  SELECT * FROM bookings WHERE userId=${userId};`;

export const insertBookingQuery = (booking: Booking) => sql`
  INSERT INTO bookings (userId, hotelId, checkInDate, checkOutDate, numberOfGuests, totalPrice, status)
  VALUES (${booking.userId}, ${booking.hotelId}, ${booking.checkInDate}, ${booking.checkOutDate}, ${booking.numberOfGuests}, ${booking.totalPrice}, ${booking.status})
  RETURNING *;`;

export const updateBookingQuery = (id: number, booking: Partial<Booking>) => sql`
  UPDATE bookings SET
    userId=${booking.userId},
    hotelId=${booking.hotelId},
    checkInDate=${booking.checkInDate},
    checkOutDate=${booking.checkOutDate},
    numberOfGuests=${booking.numberOfGuests},
    totalPrice=${booking.totalPrice},
    status=${booking.status}
  WHERE id=${id}
  RETURNING *;`;

export const deleteBookingQuery = (id: number) => sql`
  DELETE FROM bookings WHERE id=${id} RETURNING *;`;
