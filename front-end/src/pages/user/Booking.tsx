import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import Tag from "../../components/Tag/Tag";
import { createBooking } from "../../features/bookingSlice";
import type { AppDispatch, RootState } from "../../../store";
import bedImage from "../../images/bed.png"; // Import the local image

import {
  FaWifi,
  FaTv,
  FaFan,
  FaGlassWhiskey,
  FaHotTub,
  FaBed,
  FaCouch,
  FaCrown,
  FaSwimmingPool,
} from "react-icons/fa";

import styles from "./Booking.module.css"; // Import the CSS module
import { initializePayment } from "../../features/paymentSlice";

const getAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case "Wifi":
      return <FaWifi />;
    case "TV":
      return <FaTv />;
    case "AC":
      return <FaFan />; // Using FaFan for AC
    case "Mini-bar":
      return <FaGlassWhiskey />;
    case "Jacuzzi":
      return <FaHotTub />;
    case "Indoor Pool":
      return <FaSwimmingPool />;
    default:
      return null;
  }
};

const roomTypes = [
  {
    name: "Standard",
    amenities: ["Wifi", "TV"],
    basePrice: 100,
    icon: <FaBed />,
  },
  {
    name: "Deluxe",
    amenities: ["Wifi", "TV", "AC", "Mini-bar"],
    basePrice: 150,
    icon: <FaCouch />,
  },
  {
    name: "Suite",
    amenities: ["Wifi", "TV", "AC", "Mini-bar", "Jacuzzi", "Indoor Pool"],
    basePrice: 250,
    icon: <FaCrown />,
  },
];

export default function Booking() {
  const [selectedRoomType, setSelectedRoomType] = useState(roomTypes[0]);
  const [numberOfRooms, setNumberOfRooms] = useState(""); // Changed to empty string
  const [numberOfGuests, setNumberOfGuests] = useState(""); // Changed to empty string
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // New state for error messages

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user: userState, isLoggedIn } = useSelector((state: RootState) => state.user);
  const user = Array.isArray(userState) ? userState[0] : userState;
  const { access_code } = useSelector((state: RootState) => state.payment);
  const [paystackReady, setPaystackReady] = useState(false);

  console.log("Current user state in Booking.tsx:", user); // ADDED FOR DEBUGGING
  const { status, error } = useSelector((state: RootState) => state.booking);
  const [params] = useSearchParams();
  const accId = Number(params.get("accommodationId"));

  console.log("accomodation id", accId);

  useEffect(() => {
    const calculateTotalPrice = () => {
      if (checkIn && checkOut) {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
        const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        const rooms = parseInt(numberOfRooms) || 1; // Default to 1 if empty/NaN, treat 0 as 0

        if (numberOfNights > 0 && rooms > 0) {
          const price = numberOfNights * selectedRoomType.basePrice * rooms;
          setTotalPrice(price);
        } else {
          setTotalPrice(0);
        }
      } else {
        setTotalPrice(0); // Reset price if dates are not selected
      }
    };
    calculateTotalPrice();
    setErrorMessage(null); // Clear errors when inputs change
  }, [checkIn, checkOut, selectedRoomType, numberOfRooms]);

  const handleProceed = () => {
    setErrorMessage(null); // Clear previous errors

    if (!isLoggedIn || !user || !user.id) {
      setErrorMessage("You must be logged in to book a stay. Please log in.");
      // navigate("/login"); // Removed automatic navigation
      return;
    }

    if (!checkIn || !checkOut) {
      setErrorMessage("Please select check-in and check-out dates.");
      return;
    }

    if (new Date(checkOut) < new Date(checkIn)) {
      setErrorMessage("Check-out date cannot be earlier than the check-in date.");
      return;
    }

    if (!accId || isNaN(accId)) {
      setErrorMessage(
        "Accommodation ID is missing or invalid. Please select an accommodation first."
      );
      // navigate("/"); // Removed automatic navigation
      return;
    }

    dispatch(
      createBooking({
        userId: user.id,
        accommodationId: accId, // Using param
        checkInDate: new Date(checkIn),
        checkOutDate: new Date(checkOut),
        numberOfGuests: parseInt(numberOfGuests) || 0, // Parse guests, treat empty string as 0
        totalPrice: totalPrice,
        specialRequest: specialRequest,
        status: "Booked",
        roomTypeId: 2,
      })
    );

    console.log(2022, errorMessage);

    if (!errorMessage) {
      handlePayment();
    }
  };

  const handleCancel = () => {
    // alert("Booking cancelled."); // Removed alert
    setErrorMessage("Booking process cancelled.");
    // navigate("/"); // Removed automatic navigation
  };
  // **************************************************************
  // PAYMENT API
  // **************************************************************

  const handlePayment = () => {
    dispatch(
      initializePayment({
        email: "msizi@example.com",
        amount: 1000,
        callback_url: "https://booknest-j3la.onrender.com/",
      })
    );
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v2/inline.js";
    script.async = true;
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
      popup.newTransaction({
        key: "pk_test_9e1587c5a1d44caa383e112c2763d931b67a0815",
        email: "sample@email.com",
        amount: 23400,
        onSuccess: (transaction: any) => {
          // add booking and navigate to confirmation
          console.log(2019, "transaction", transaction);
          navigate("/confirmation");
        },
      });
    }
  }, [access_code]);

  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className={styles.bookingContainer}>
      <div className={styles.contentWrapper}>
        {/* Left Column: Form */}
        <div className={styles.formColumn}>
          <h1 style={{ marginBottom: "10px", color: "#2c3e50" }}>
            Book Your Stay
          </h1>
          <p style={{ color: "#7f8c8d", marginBottom: "30px" }}>
            Complete the form below to finalize your reservation.
          </p>

          {errorMessage && ( // Display error message if present
            <div
              style={{
                color: "red",
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid red",
                borderRadius: "5px",
              }}
            >
              {errorMessage}
            </div>
          )}

          <div style={{ marginBottom: "30px" }}>
            <h2
              style={{
                fontSize: "1.2rem",
                color: "#34495e",
                marginBottom: "15px",
              }}
            >
              Select Room Type
            </h2>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              {roomTypes.map((room) => (
                <Button 
                  key={room.name}
                  onClick={() => setSelectedRoomType(room)}
                  variant={
                    selectedRoomType.name === room.name
                      ? "primary"
                      : "secondary"
                  }
                >
                  {room.icon} {room.name}
                </Button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
              {selectedRoomType.amenities.map((amenity) => (
                <Tag
                  key={amenity}
                  text={
                    <span>
                      {getAmenityIcon(amenity)} {amenity}
                    </span>
                  }
                />
              ))}
            </div>
          </div>

          <div className="booking-ui"
          
          >
            <InputField
              type="date"
              label="Check-in Date"
              field={checkIn}
              setField={setCheckIn}
              details="Select your arrival date."
              name="checkInDate"
              min={getTodayString()}
            />
            <InputField
              type="date"
              label="Check-out Date"
              field={checkOut}
              setField={setCheckOut}
              details="Select your departure date."
              name="checkOutDate"
              min={checkIn || getTodayString()}
            />
            <InputField
              type="number"
              label="Number of Rooms"
              field={String(numberOfRooms)}
              setField={setNumberOfRooms}
              details="Specify how many rooms you need."
              name="numberOfRooms"
            />
            <InputField
              type="number"
              label="Number of Guests"
              field={String(numberOfGuests)}
              setField={(val) => setNumberOfGuests(Number(val))}
              details="Including yourself and any companions."
              name="numberOfGuests"
            />
          </div>

          <h2
            style={{
              fontSize: "1.2rem",
              color: "#34495e",
              marginTop: "30px",
              marginBottom: "15px",
            }}
          >
            Personal Information
          </h2>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}
          >
            <InputField
              type="tel"
              label="Phone Number"
              placeholder="e.g., +27 12 345 6789"
              field={phone}
              setField={setPhone}
              details="We'll use this to contact you about your booking."
              name="phoneNumber"
            />
        
            <InputField
              type="text"
              label="Special Requests (optional)"
              placeholder="e.g., late check-in, specific view"
              field={specialRequest}
              setField={setSpecialRequest}
              details="Any particular needs or preferences?"
              name="specialRequests"
            />
          </div>

          <div className={styles.buttonContainer}>
            <Button onClick={handleCancel} variant="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleProceed}
              variant="primary"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Processing..." : "Proceed To Payment"}
            </Button>
          </div>
        </div>

        {/* Right Column: Summary */}
        <div className={styles.summaryColumn}>
          <h2
            style={{
              color: "#2c3e50",
              marginBottom: "20px",
              borderBottom: "1px solid #ecf0f1",
              paddingBottom: "10px",
            }}
          >
            Booking Summary
          </h2>
          <img
            src={bedImage}
            alt="Selected Room Type Image"
            style={{
              width: "50%",
              margin: "0 auto",
              borderRadius: "8px",
              marginBottom: "20px",
              display: "block",
            }}
          />
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span style={{ color: "#7f8c8d" }}>Room Type:</span>
              <span style={{ fontWeight: "bold" }}>
                {selectedRoomType.name}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span style={{ color: "#7f8c8d" }}>Check-in:</span>
              <span style={{ fontWeight: "bold" }}>{checkIn || "Not set"}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span style={{ color: "#7f8c8d" }}>Check-out:</span>
              <span style={{ fontWeight: "bold" }}>
                {checkOut || "Not set"}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <span style={{ color: "#7f8c8d" }}>Rooms:</span>
              <span style={{ fontWeight: "bold" }}>{numberOfRooms}</span>
            </div>
            <div style={{ borderTop: "1px solid #ecf0f1", paddingTop: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  className: styles.totalPrice,
                }}
              >
                <span>Total:</span>
                <span>R {totalPrice.toFixed(2)}</span>
              </div>
              <p
                style={{
                  color: "#95a5a6",
                  fontSize: "0.8rem",
                  textAlign: "right",
                }}
              >
                Includes all taxes and fees
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
