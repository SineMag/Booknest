import { sql } from "../utils/database";

export interface Booking {
  id?: string;
  checkInDate: Date;
  checkOutDate: Date;
  numberOfGuests: number;
  totalPrice: number;
  specialRequest?: string;
  status: string;
  userId: number;
  accommodationId: number;
}

export const createBookingTableQuery = () => sql`
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  checkInDate DATE NOT NULL,
  checkOutDate DATE NOT NULL,
  numberOfGuests INTEGER NOT NULL,
  totalPrice DECIMAL NOT NULL,
  specialRequest TEXT,
  status VARCHAR(255) NOT NULL,
  userId INTEGER NOT NULL,
  accommodationId INTEGER NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)  ON DELETE CASCADE,
  FOREIGN KEY (accommodationId) REFERENCES accomodations(id) ON DELETE CASCADE
);
`;

export const getBookingsQuery = () => sql`
  SELECT * FROM bookings;
`;

export const getBookingByIdQuery = (id: number) => sql`
  SELECT * FROM bookings WHERE id=${id};
`;

export const createBookingQuery = (booking: Booking) => sql`
  INSERT INTO bookings (
    checkInDate,
    checkOutDate,
    numberOfGuests,
    totalPrice,
    specialRequest,
    status,
    userId,
    accommodationId
  ) VALUES (
    ${booking.checkInDate},
    ${booking.checkOutDate},
    ${booking.numberOfGuests},
    ${booking.totalPrice},
    ${booking.specialRequest},
    ${booking.status},
    ${booking.userId},
    ${booking.accommodationId}
  ) RETURNING *;`;

export const updateBookingQuery = (id: number, booking: Booking) => sql`
  UPDATE bookings SET
    checkInDate=${booking.checkInDate},
    checkOutDate=${booking.checkOutDate},
    numberOfGuests=${booking.numberOfGuests},
    totalPrice=${booking.totalPrice},
    specialRequest=${booking.specialRequest},
    status=${booking.status},
    userId=${booking.userId},
    accommodationId=${booking.accommodationId}
  WHERE id=${id} RETURNING *;`;

export const deleteBookingQuery = (id: number) => sql`
  DELETE FROM bookings WHERE id=${id} RETURNING *;`;
