import { sql } from "../utils/database";

export interface UserBooking {
  id?: number;
  userId: number;
  accomodationId: number;
  guests: number;
  checkIn: string;
  checkOut: string;
  phone: string;
  totalPrice: number;
  specialRequest?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt?: Date;
}
export const bookingTableQuery = () => sql`
 CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id),
       accommodation_id INTEGER NOT NULL,
      check_in_date DATE NOT NULL,
      check_out_date DATE NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );`;
