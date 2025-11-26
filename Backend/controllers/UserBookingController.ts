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
                accomodationId: accommodation_id,
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
            
            if (!id) {
                res.status(400).json({ message: "Missing required parameter: id" });
                return;
            }
            
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

            if (!id) {
                res.status(400).json({ message: "Missing required parameter: id" });
                return;
            }

            if (!status || !["pending", "confirmed", "cancelled"].includes(status)) {
                res.status(400).json({ message: "Invalid status provided" });
                return;
            }
            const updatedBooking = await UserBookingService.updateBookingStatus(parseInt(id, 10), status as "pending" | "confirmed" | "cancelled");

            if (updatedBooking) {
                res.status(200).json(updatedBooking);
            } else {
                res.status(404).json({ message: "Booking not found" });
            }
        }
        catch (error) {
            console.log('Error updating booking status:', error);
            res.status(500).json({ message: "Internal server error" });
            static async getAllBookings(req: Request, res: Response): Promise<void> {
                try {
                    const bookings = await UserBookingService.getAllBookings();
                    res.status(200).json(bookings);
                } catch (error) {
                    console.error("Error fetching all bookings:", error);
                    res.status(500).json({ message: "Internal server error" });
                }
            }
        
            static async getBookingById(req: Request, res: Response): Promise<void> {
                try {
                    const { id } = req.params;
                    if (!id) {
                        res.status(400).json({ message: "Missing required parameter: id" });
                        return;
                    }
                    const booking = await UserBookingService.getBookingById(parseInt(id, 10));
                    if (booking) {
                        res.status(200).json(booking);
                    } else {
                        res.status(404).json({ message: "Booking not found" });
                    }
                } catch (error) {
                    console.error("Error fetching booking by ID:", error);
                    res.status(500).json({ message: "Internal server error" });
                }
            }
        
            static async updateBooking(req: Request, res: Response): Promise<void> {
                try {
                    const { id } = req.params;
                    const { user_id, accommodation_id, guests, check_in, check_out, phone, total_price, special_request, status } = req.body;
        
                    if (!id) {
                        res.status(400).json({ message: "Missing required parameter: id" });
                        return;
                    }
        
                    const updatedFields: Partial<Omit<UserBooking, 'id' | 'createdAt'>> = {};
                    if (user_id !== undefined) updatedFields.userId = user_id;
                    if (accommodation_id !== undefined) updatedFields.accomodationId = accommodation_id;
                    if (guests !== undefined) updatedFields.guests = guests;
                    if (check_in !== undefined) updatedFields.checkIn = new Date(check_in).toISOString();
                    if (check_out !== undefined) updatedFields.checkOut = new Date(check_out).toISOString();
                    if (phone !== undefined) updatedFields.phone = phone;
                    if (total_price !== undefined) updatedFields.totalPrice = parseFloat(total_price);
                    if (special_request !== undefined) updatedFields.specialRequest = special_request;
                    if (status !== undefined && ["pending", "confirmed", "cancelled"].includes(status)) updatedFields.status = status;
        
                    const updatedBooking = await UserBookingService.updateBooking(parseInt(id, 10), updatedFields);
        
                    if (updatedBooking) {
                        res.status(200).json(updatedBooking);
                    } else {
                        res.status(404).json({ message: "Booking not found or no changes made" });
                    }
                } catch (error) {
                    console.error("Error updating booking:", error);
                    res.status(500).json({ message: "Internal server error" });
                }
            }
        
            static async deleteBooking(req: Request, res: Response): Promise<void> {
                try {
                    const { id } = req.params;
                    if (!id) {
                        res.status(400).json({ message: "Missing required parameter: id" });
                        return;
                    }
                    const deletedBooking = await UserBookingService.deleteBooking(parseInt(id, 10));
                    if (deletedBooking) {
                        res.status(200).json({ message: "Booking deleted successfully" });
                    } else {
                        res.status(404).json({ message: "Booking not found" });
                    }
                } catch (error) {
                    console.error("Error deleting booking:", error);
                    res.status(500).json({ message: "Internal server error" });
                }
            }
        }
        