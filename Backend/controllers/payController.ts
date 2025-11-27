import dotenv from "dotenv";
dotenv.config();
import type { Request, Response } from "express";
import axios from "axios";

export const initializePayment = async (req: Request, res: Response) => {
  console.log("B2B: initializing payment...");
  try {
    const { email, amount } = req.body;

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount, // amount must be in kobo (₦500 = 50000)
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("pAYsTACK response", response.data);

    // The important value: access_code
    return res.json(response.data);
  } catch (error: any) {
    return res.status(400).json({
      message: "Initialization failed",
      error: error.response?.data || error.message,
    });
  }
};
