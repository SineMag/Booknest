import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { initializePayment } from "../features/paymentSlice";
import { useEffect, useState } from "react";
import type PaystackPop from "@paystack/inline-js";

export default function PaymentButton() {
  const dispatch = useDispatch<AppDispatch>();
  const { access_code, loading } = useSelector(
    (state: RootState) => state.payment
  );
  const [paystackReady, setPaystackReady] = useState(false);

  const handlePayment = () => {
    dispatch(
      initializePayment({
        email: "msizi@example.com",
        amount: 1000,
      })
    );
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v2/inline.js";
    https: script.async = true;
    script.onload = () => {
      console.log("Paystack script loaded:", window.PaystackPop);
      setPaystackReady(true);
    };
    script.onerror = () => {
      console.error("Failed to load Paystack script");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // When access_code arrives, open Paystack popup
  useEffect(() => {
    if (!paystackReady) return;

    if (access_code) {
      console.log("popup: ", window.PaystackPop);
      const popup = new window.PaystackPop();
      popup.resumeTransaction(access_code);
    }
  }, [access_code]);

  return (
    <button onClick={handlePayment} disabled={loading}>
      Pay
    </button>
  );
}
