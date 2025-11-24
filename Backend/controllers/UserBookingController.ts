import type { Request, Response } from "express";
import { UserBookingService } from "../services/UserBookingService";
import type { UserBooking } from "../models/UserBookings";

export class UserBookingController {
    static async createBooking(req: Request, res: Response): Promise<void> {
        try{
            const { user_id, accommodation_id, guests, check_in, check_out, phone, total_price, special_request } = req.body;

            //basic validation 
            if (!user_id || !accommodation_id || !guests || !check_in || !check_out || !phone || !total_price) {
                res.status(400).json({ message: "Missing required fields" });
                return;
            }

            const newBooking: Omit<UserBooking, 'id' | 'createdAt' | 'status'> = {
                userId: user_id,
                accommodationId: accommodation_id,
                guests,
                checkIn: new Date(check_in).toISOString(),
                checkOut: new Date(check_out).toISOString(),
                phone,
                totalPrice: parseFloat(total_price),
                specialRequest: special_request
            };

            const createdBooking = await UserBookingService.createBooking(newBooking);
            res.status(201).json(createdBooking);
        }
        catch (error) {
            console.error("Error creating booking:", error);
            res.status(500).json({ message: "Internal server error" });
        }
}
    static async getBookingsByUserId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
             const bookings = await UserBookingService.getBookingsByUserId(parseInt(id, 10));

             if(bookings){
                res.status(200).json(bookings);
             } else {
                                res.status(404).json({ message: `No Bookings Found for ${id}` });
             }
        }
        catch (error) {
            console.error("Error fetching bookings:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async updateBookingStatus(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!status || !["pending", "confirmed", "cancelled"].includes(status)) {
                res.status(400).json({ message: "Invalid status provided" });
                return;
            }
            const updatedBooking = await UserBookingService.updateBookingStatus(parseInt(id, 10), status);

            if (updatedBooking) {
                res.status(200).json(updatedBooking);
            } else {
                res.status(404).json({ message: "Booking not found" });
            }
        }
        catch (error) {
            console.log('Error updating booking status:', error);
            res.status(500).json({ message: "Internal server error" });
        }
        }
    }