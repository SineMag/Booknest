import express from 'express';
import Stripe from 'stripe';


const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-11-17.clover',
});

router.post('/create-payment-intent', async (req, res) => {
    const {price, name} = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'zar',
                    product_data: {
                        name: name,
                    },
                    unit_amount: price * 100,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'http://localhost:3000/confirmation',
            cancel_url: 'http://localhost:3000/accomodation-details',
        });
        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;

router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig!, process.env.STRIPE_WEBHOOK_SECRET as string);
    } catch (err:any) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return res.sendStatus(400);
    }
    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
    }
    res.json({received: true});
}
);