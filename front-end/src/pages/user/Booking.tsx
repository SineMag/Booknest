import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import Tag from "../../components/Tag/Tag";
import bedImage from "../../images/bed.png"; // Import the local image
import styles from "./Booking.module.css"; // Import the CSS module
import { initializePayment } from "../../features/paymentSlice";
import type { AppDispatch, RootState } from "../../../store";
import { createBooking } from "../../features/bookingSlice";
import { ROOM_TYPES, type RoomType } from "../../types/RoomType";
import { fetchAccomodationById } from "../../features/accomodationSlice";
import MiniTag from "../../components/Tag/MiniTag";

export default function Booking() {
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | null>(
    null
  );
  const [numberOfRooms, setNumberOfRooms] = useState(""); // Changed to empty string
  const [numberOfGuests, setNumberOfGuests] = useState(""); // Changed to empty string
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // New state for error messages
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const { access_code } = useSelector((state: RootState) => state.payment);
  const [paystackReady, setPaystackReady] = useState(false);

  const [params] = useSearchParams();
  const accId = Number(params.get("accommodationId"));
  const { current } = useSelector((state: RootState) => state.accomodation);

  useEffect(() => {
    if (accId) {
      dispatch(fetchAccomodationById(accId));
    }
  }, [accId, dispatch]);

  // FROM db RoomType ["..", "..."] to RoomTypeObjects [{...}, {...}, ...]
  const getRoomTypes = (keys: string[]) => {
    const roomTypes: RoomType[] = [];
    keys.forEach((key) => {
      const roomType = ROOM_TYPES.find((r) => r.name === key);
      if (roomType) {
        roomTypes.push(roomType);
      }
    });
    return roomTypes;
  };

  useEffect(() => {
    if (!current || !current.amenities) return;

    const roomTypeKeys = current.roomtypes; // ["Standard Room", "Suite", ...]
    const mapped = getRoomTypes(roomTypeKeys);

    setRoomTypes(mapped);
    setSelectedRoomType(mapped[0]);
  }, [current]); // runs ONLY when current changes

  useEffect(() => {
    const calculateTotalPrice = () => {
      if (checkIn && checkOut) {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
        const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        const rooms = parseInt(numberOfRooms) || 1; // Default to 1 if empty/NaN, treat 0 as 0

        if (numberOfNights > 0 && rooms > 0 && selectedRoomType) {
          const price =
            numberOfNights * selectedRoomType.pricePerPersonPerNight * rooms;
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

    if (!user || !("id" in user)) {
      setErrorMessage("You must be logged in to book a stay. Please log in.");
      // navigate("/login"); // Removed automatic navigation
      return;
    }

    if (!checkIn || !checkOut) {
      setErrorMessage("Please select check-in and check-out dates.");
      return;
    }

    if (new Date(checkOut) < new Date(checkIn)) {
      setErrorMessage(
        "Check-out date cannot be earlier than the check-in date."
      );
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
        userId: user.id!,
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
        email: "msizimwelase007@gmail.com",
        amount: totalPrice,
      })
    );
  };

  console.log("CURRENT USER: ", user);

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
      const popup = new window.PaystackPop();
      popup.newTransaction({
        key: "pk_test_9e1587c5a1d44caa383e112c2763d931b67a0815",
        email: user!.emailAddress,
        amount: totalPrice * 100,
        onSuccess: (transaction: any) => {
          // add booking and navigate to confirmation
          navigate("/confirmation");
        },
      });
    }
  }, [access_code]);

  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
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
                    selectedRoomType?.name === room.name
                      ? "facebook"
                      : "secondary"
                  }
                >
                  {room.name}
                </Button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
              {selectedRoomType &&
                selectedRoomType!.amenities.map((amenity) => (
                  <MiniTag text={amenity.label} icon={amenity.icon} />
                ))}
            </div>
          </div>

          <div className="booking-ui">
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
              setField={(val) => setNumberOfGuests(val)}
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
                {/* {selectedRoomType.name} */}
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
                }}
                className={styles.totalPrice}
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
