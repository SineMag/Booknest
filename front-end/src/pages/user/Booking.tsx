import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { createBooking, createPaymentIntent } from "../../features/bookingSlice";
import type { AppDispatch, RootState } from "../../../store";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/confirmation`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "An unexpected error occurred.");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        variant="primary"
        style={{ marginTop: "20px", width: "100%" }}
      >
        <span id="button-text">
          {isLoading ? "Processing..." : "Pay now"}
        </span>
      </Button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

export default function Booking() {
  const [rooms, setRooms] = useState("1");
  const [guests, setGuests] = useState("1");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [phone, setPhone] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const { booking, status, error, clientSecret } = useSelector(
    (state: RootState) => state.booking
  );

  const handleProceed = async () => {
    if (!user || !("id" in user)) {
      alert("You must be logged in to book a stay.");
      navigate("/login");
      return;
    }

    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const totalPrice = numberOfNights * 100; // Assuming 100 per night

    const result = await dispatch(
      createBooking({
        userId: user.id,
        accommodationId: 1, // Using fake accommodationId
        checkInDate: checkIn,
        checkOutDate: checkOut,
        numberOfGuests: parseInt(guests),
        totalPrice: totalPrice,
      })
    );

    if (createBooking.fulfilled.match(result)) {
      const bookingId = result.payload.id;
      await dispatch(createPaymentIntent(bookingId));
      setShowPaymentModal(true);
    }
  };

  useEffect(() => {
    if (status === "failed") {
      alert(`Error: ${error}`);
    }
  }, [status, error]);

  const handleCancel = () => {
    alert("Booking cancelled.");
    navigate("/");
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "500px",
            width: "100%",
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
            Book Your Stay
          </h1>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <InputField
              type="number"
              placeholder="Number of Rooms"
              field={rooms}
              setField={setRooms}
            />
            <InputField
              type="number"
              placeholder="Number of Guests"
              field={guests}
              setField={setGuests}
            />
            <InputField
              type="date"
              placeholder="Check-in Date"
              field={checkIn}
              setField={setCheckIn}
            />
            <InputField
              type="date"
              placeholder="Check-out Date"
              field={checkOut}
              setField={setCheckOut}
            />
            <InputField
              type="tel"
              placeholder="Phone Number"
              field={phone}
              setField={setPhone}
            />
            <InputField
              type="time"
              placeholder="Arrival Time"
              field={arrivalTime}
              setField={setArrivalTime}
            />
            <InputField
              type="text"
              placeholder="Special Request"
              field={specialRequest}
              setField={setSpecialRequest}
            />
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                onClick={handleProceed}
                variant="primary"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Processing..." : "Proceed to Payment"}
              </Button>
              <Button onClick={handleCancel} variant="secondary">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
      {showPaymentModal && clientSecret && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "8px",
              width: "500px",
            }}
          >
            <Elements options={{ clientSecret }} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
