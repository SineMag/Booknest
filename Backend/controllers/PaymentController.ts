import type { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { UserBookingService } from '../services/UserBookingService';

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in the environment variables.');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export class PaymentController {
  static async createPaymentIntent(req: Request, res: Response): Promise<void> {
    try {
      const { bookingId } = req.body;

      if (!bookingId) {
        res.status(400).json({ message: 'Booking ID is required' });
        return;
      }

      const booking = await UserBookingService.getBookingById(bookingId);

      if (!booking) {
        res.status(404).json({ message: 'Booking not found' });
        return;
      }

      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(booking.totalPrice * 100), // Stripe expects amount in cents
        currency: 'usd', // Or your preferred currency
        metadata: { bookingId: booking.id?.toString() || '' },
      });

      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async handleWebhook(req: Request, res: Response): Promise<void> {
    let event: Stripe.Event;

    try {
      const sig = req.headers['stripe-signature'] as string;
      event = stripe.webhooks.constructEvent((req as any).rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
    } catch (err: any) {
      console.error(`Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object as Stripe.PaymentIntent;
        console.log(`PaymentIntent for ${paymentIntentSucceeded.amount} was successful!`);
        // Update booking status to 'confirmed'
        const bookingId = paymentIntentSucceeded.metadata?.bookingId;
        if (bookingId) {
          await UserBookingService.updateBookingStatus(parseInt(bookingId, 10), 'confirmed');
          console.log(`Booking ${bookingId} confirmed.`);
        }
        break;
      case 'payment_intent.payment_failed':
        const paymentIntentFailed = event.data.object as Stripe.PaymentIntent;
        console.log(`PaymentIntent for ${paymentIntentFailed.amount} failed!`);
        // Optionally update booking status to 'cancelled' or similar
        const failedBookingId = paymentIntentFailed.metadata?.bookingId;
        if (failedBookingId) {
          await UserBookingService.updateBookingStatus(parseInt(failedBookingId, 10), 'cancelled');
          console.log(`Booking ${failedBookingId} cancelled due to payment failure.`);
        }
        break;
      // ... handle other event types ...continue form here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true });
  }
}