import {sql } from "../database";
import type { UserBooking } from "../models/UserBookings";

export class UserBookingService {
    static async createBooking(booking: Omit<UserBooking, 'id' | 'createdAt' | 'status'>): Promise<UserBooking> {
        const result = await sql`
        INSERT INTO bookings (user_id, accommodation_id, guests, check_in_date, check_out_date, phone, total_price, special_request)
        VALUES (${booking.userId}, ${booking.accomodationId}, ${booking.guests}, ${booking.checkIn}, ${booking.checkOut}, ${booking.phone}, ${booking.totalPrice}, ${booking.specialRequest}, 'pending')
        RETURNING id, userId, accomodationId, guests, checkIn, checkOut, phone, totalPrice, specialRequest, status, createdAt;
        `;
        return result[0] as UserBooking;
    }

    static async getBookingsByUserId(userId: number): Promise<UserBooking | null> {
        const result = await sql`
        SELECT id, user_id AS "userId", accommodation_id AS "accomodationId", guests, check_in_date AS "checkIn", check_out_date AS "checkOut", phone, total_price AS "totalPrice", special_request AS "specialRequest", status, created_at AS "createdAt"
        FROM bookings
        WHERE user_id = ${userId};
        `;
        return result.length > 0 ? result[0] as UserBooking : null;
    }

    static async updateBookingStatus(bookingId: number, status: "pending" | "confirmed" | "cancelled"): Promise<UserBooking | null> {
        const result = await sql`
        UPDATE bookings
        SET status = ${status}
        WHERE id = ${bookingId}
        RETURNING id, user_id AS "userId", accommodation_id AS "accomodationId", guests, check_in_date AS "checkIn", check_out_date AS "checkOut", phone, total_price AS "totalPrice", special_request AS "specialRequest", status, created_at AS "createdAt";
        `;
        return result.length > 0 ? result[0] as UserBooking : null;
    }
    }