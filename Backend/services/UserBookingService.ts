import {sql } from "../database";
import type { UserBooking } from "../models/UserBookings";

export class UserBookingService {
    static async createBooking(booking: Omit<UserBooking, 'id' | 'createdAt' | 'status'>): Promise<UserBooking> {
        const result = await sql`
        INSERT INTO bookings (user_id, accommodation_id, guests, check_in, check_out, phone, total_price, special_request)
        VALUES (${booking.userId}, ${booking.accomodationId}, ${booking.guests}, ${booking.checkIn}, ${booking.checkOut}, ${booking.phone}, ${booking.totalPrice}, ${booking.specialRequest})
        RETURNING id, user_id as "userId", accommodation_id as "accommodationId", guests, check_in as "checkIn", check_out as "checkOut", phone, total_price as "totalPrice", special_request as "specialRequest", status, created_at as "createdAt";
        `;
        return result[0] as UserBooking;
    }

    static async getBookingsByUserId(userId: number): Promise<UserBooking[] | null> {
        const result = await sql`
        SELECT id, user_id AS "userId", accommodation_id AS "accommodationId", guests, check_in AS "checkIn", check_out AS "checkOut", phone, total_price AS "totalPrice", special_request AS "specialRequest", status, created_at AS "createdAt"
        FROM bookings
        WHERE user_id = ${userId};
        `;
        return result.length > 0 ? result as UserBooking[] : null;
    }

    static async getBookingById(bookingId: number): Promise<UserBooking | null> {
        const result = await sql`
        SELECT id, user_id AS "userId", accommodation_id AS "accommodationId", guests, check_in AS "checkIn", check_out AS "checkOut", phone, total_price AS "totalPrice", special_request AS "specialRequest", status, created_at AS "createdAt"
        FROM bookings
        WHERE id = ${bookingId};
        `;
        return result.length > 0 ? result[0] as UserBooking : null;
    }

    static async getAllBookings(): Promise<UserBooking[]> {
        const result = await sql`
        SELECT id, user_id AS "userId", accommodation_id AS "accommodationId", guests, check_in AS "checkIn", check_out AS "checkOut", phone, total_price AS "totalPrice", special_request AS "specialRequest", status, created_at AS "createdAt"
        FROM bookings;
        `;
        return result as UserBooking[];
    }

    static async updateBooking(bookingId: number, booking: Partial<Omit<UserBooking, 'id' | 'createdAt'>>): Promise<UserBooking | null> {
        const setClauses: string[] = [];
        const values: any[] = [];

        if (booking.userId !== undefined) {
            setClauses.push('user_id = $');
            values.push(booking.userId);
        }
        if (booking.accomodationId !== undefined) {
            setClauses.push('accommodation_id = $');
            values.push(booking.accomodationId);
        }
        if (booking.guests !== undefined) {
            setClauses.push('guests = $');
            values.push(booking.guests);
        }
        if (booking.checkIn !== undefined) {
            setClauses.push('check_in = $');
            values.push(booking.checkIn);
        }
        if (booking.checkOut !== undefined) {
            setClauses.push('check_out = $');
            values.push(booking.checkOut);
        }
        if (booking.phone !== undefined) {
            setClauses.push('phone = $');
            values.push(booking.phone);
        }
        if (booking.totalPrice !== undefined) {
            setClauses.push('total_price = $');
            values.push(booking.totalPrice);
        }
        if (booking.specialRequest !== undefined) {
            setClauses.push('special_request = $');
            values.push(booking.specialRequest);
        }
        if (booking.status !== undefined) {
            setClauses.push('status = $');
            values.push(booking.status);
        }

        if (setClauses.length === 0) {
            return null; // No fields to update
        }

        const query = `
            UPDATE bookings
            SET ${setClauses.join(', ')}
            WHERE id = $
            RETURNING id, user_id AS "userId", accommodation_id AS "accommodationId", guests, check_in AS "checkIn", check_out AS "checkOut", phone, total_price AS "totalPrice", special_request AS "specialRequest", status, created_at AS "createdAt";
        `;
        // Manually build the parameterized query to handle dynamic `setClauses`
        let paramIndex = 1;
        const finalQuery = query.replace(/\$/g, () => `$${paramIndex++}`);
        values.push(bookingId); // Add bookingId to the end of values for the WHERE clause

        const result = await sql.unsafe(finalQuery, values);
        return result.length > 0 ? result[0] as UserBooking : null;
    }

    static async deleteBooking(bookingId: number): Promise<UserBooking | null> {
        const result = await sql`
        DELETE FROM bookings
        WHERE id = ${bookingId}
        RETURNING id, user_id AS "userId", accommodation_id AS "accommodationId", guests, check_in AS "checkIn", check_out AS "checkOut", phone, total_price AS "totalPrice", special_request AS "specialRequest", status, created_at AS "createdAt";
        `;
        return result.length > 0 ? result[0] as UserBooking : null;
    }

    static async updateBookingStatus(bookingId: number, status: "pending" | "confirmed" | "cancelled"): Promise<UserBooking | null> {
        const result = await sql`
        UPDATE bookings
        SET status = ${status}
        WHERE id = ${bookingId}
        RETURNING id, user_id AS "userId", accommodation_id AS "accommodationId", guests, check_in AS "checkIn", check_out AS "checkOut", phone, total_price AS "totalPrice", special_request AS "specialRequest", status, created_at AS "createdAt";
        `;
        return result.length > 0 ? result[0] as UserBooking : null;
    }
    }