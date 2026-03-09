import { Router } from "express";
import { initializePayment } from "../controllers/paymentController";

const router = Router();

router.get("/", (req, res) => res.send("Hello Payment!"));
router.post("/initialize", initializePayment);

export default router;
