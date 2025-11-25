import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";

const CheckCircle = ({ size = 80, color = "black" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
    <path d="M9 12.5l1.8 1.8L15 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const ExclamationCircle = ({ size = 80, color = "red" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
        <line x1="12" y1="8" x2="12" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <line x1="12" y1="16" x2="12" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const Confirmation: React.FC = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh", backgroundColor: "#f5f6fa", padding: "2rem" }}>
        <div style={{ width: "360px", background: "#fff", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
            {message === "Payment succeeded!" ? <CheckCircle /> : <ExclamationCircle />}
          </div>
          <h2 style={{ marginBottom: "1rem", color: "black" }}>
            {message}
          </h2>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "2rem" }}>
            <Link to="/my-bookings" style={{ textDecoration: "none" }}>
              <button type="button" style={{ backgroundColor: "#007bff", color: "#fff", padding: "1rem 1.25rem", fontWeight: 600, border: "none", borderRadius: "8px", cursor: "pointer" }}>
                View Bookings
              </button>
            </Link>
            <Link to="/" style={{ textDecoration: "none" }}>
              <button type="button" style={{ backgroundColor: "#007bff", color: "#fff", padding: "1rem 1.25rem", fontWeight: 600, border: "none", borderRadius: "8px", cursor: "pointer" }}>
                Home
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Confirmation;
