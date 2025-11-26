import { Router } from 'express';
import { PaymentController } from '../controllers/PaymentController';

const router = Router();

router.post('/create-payment-intent', PaymentController.createPaymentIntent);
router.post('/webhook', PaymentController.handleWebhook);

export default router;
