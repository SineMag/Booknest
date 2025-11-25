import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import Tag from "../../components/Tag/Tag";
import { createBooking } from "../../features/bookingSlice";
import type { AppDispatch, RootState } from "../../../store";
import bedImage from '../../images/bed.png'; // Import the local image

import { FaWifi, FaTv, FaFan, FaGlassWhiskey, FaHotTub, FaBed, FaCouch, FaCrown, FaSwimmingPool } from 'react-icons/fa';


import styles from './Booking.module.css'; // Import the CSS module

const getAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case "Wifi": return <FaWifi />;
    case "TV": return <FaTv />;
    case "AC": return <FaFan />; // Using FaFan for AC
    case "Mini-bar": return <FaGlassWhiskey />;
    case "Jacuzzi": return <FaHotTub />;
    case "Indoor Pool": return <FaSwimmingPool />;
    default: return null;
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

interface BookingProps {
  accommodationId?: number; // Make it optional for now, but validate its presence
}

export default function Booking({ accommodationId }: BookingProps) {
  const [selectedRoomType, setSelectedRoomType] = useState(roomTypes[0]);
  const [numberOfRooms, setNumberOfRooms] = useState(""); // Changed to empty string
  const [numberOfGuests, setNumberOfGuests] = useState(""); // Changed to empty string
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const { status, error } = useSelector((state: RootState) => state.booking);

  useEffect(() => {
    const calculateTotalPrice = () => {
      if (checkIn && checkOut) {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
        const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        const rooms = parseInt(numberOfRooms) || 1; // Default to 1 if empty/NaN, treat 0 as 0
        
        if (numberOfNights > 0 && rooms > 0) {
          const price =
            numberOfNights * selectedRoomType.basePrice * rooms;
          setTotalPrice(price);
        } else {
          setTotalPrice(0);
        }
      } else {
        setTotalPrice(0); // Reset price if dates are not selected
      }
    };
    calculateTotalPrice();
  }, [checkIn, checkOut, selectedRoomType, numberOfRooms]);

  const handleProceed = () => {
    if (!user || !("id" in user)) {
      alert("You must be logged in to book a stay.");
      navigate("/login");
      return;
    }

    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    if (!accommodationId) {
      alert("Accommodation ID is missing. Please select an accommodation first.");
      navigate("/"); // Navigate to home or accommodation listing page
      return;
    }

    dispatch(
      createBooking({
        userId: user.id,
        accommodationId: accommodationId, // Using prop
        checkInDate: checkIn,
        checkOutDate: checkOut,
        numberOfGuests: parseInt(numberOfGuests) || 0, // Parse guests, treat empty string as 0
        totalPrice: totalPrice,
        phone: phone,
        specialRequest: specialRequest,
      })
    );
    navigate("/confirmation");
  };

  const handleCancel = () => {
    alert("Booking cancelled.");
    navigate("/");
  };

  return (
    <div className={styles.bookingContainer}>
      <Navbar />
      <div className={styles.contentWrapper}>
        {/* Left Column: Form */}
        <div className={styles.formColumn}>
          <h1 style={{ marginBottom: "10px", color: "#2c3e50" }}>
            Book Your Stay
          </h1>
          <p style={{ color: "#7f8c8d", marginBottom: "30px" }}>
            Complete the form below to finalize your reservation.
          </p>

          <div style={{ marginBottom: "30px" }}>
            <h2 style={{ fontSize: "1.2rem", color: "#34495e", marginBottom: "15px" }}>
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
                <Tag key={amenity} text={<span>{getAmenityIcon(amenity)} {amenity}</span>} />
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
            <InputField type="date" label="Check-in Date" field={checkIn} setField={setCheckIn} details="Select your arrival date." />
            <InputField type="date" label="Check-out Date" field={checkOut} setField={setCheckOut} details="Select your departure date." />
            <InputField type="number" label="Number of Rooms" field={String(numberOfRooms)} setField={(val) => setNumberOfRooms(Number(val))} details="Specify how many rooms you need." />
            <InputField type="number" label="Number of Guests" field={String(numberOfGuests)} setField={(val) => setNumberOfGuests(Number(val))} details="Including yourself and any companions." />
          </div>

          <h2 style={{ fontSize: "1.2rem", color: "#34495e", marginTop: "30px", marginBottom: "15px" }}>
            Personal Information
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
            <InputField type="tel" label="Phone Number" placeholder="e.g., +27 12 345 6789" field={phone} setField={setPhone} details="We'll use this to contact you about your booking." />
            <InputField type="text" label="Special Requests (optional)" placeholder="e.g., late check-in, specific view" field={specialRequest} setField={setSpecialRequest} details="Any particular needs or preferences?" />
          </div>

          <div className={styles.buttonContainer}>
            <Button onClick={handleCancel} variant="secondary">Cancel</Button>
            <Button onClick={handleProceed} variant="primary" disabled={status === "loading"}>
              {status === "loading" ? "Processing..." : "Confirm Booking"}
            </Button>
          </div>
        </div>

        {/* Right Column: Summary */}
        <div className={styles.summaryColumn}>
          <h2 style={{ color: "#2c3e50", marginBottom: "20px", borderBottom: "1px solid #ecf0f1", paddingBottom: "10px" }}>
            Booking Summary
          </h2>
          <img
            src={bedImage}
            alt="Selected Room Type Image"
            style={{ width: "50%", margin: "0 auto", borderRadius: "8px", marginBottom: "20px", display: "block" }}
          />
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ color: "#7f8c8d" }}>Room Type:</span>
              <span style={{ fontWeight: "bold" }}>{selectedRoomType.name}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ color: "#7f8c8d" }}>Check-in:</span>
              <span style={{ fontWeight: "bold" }}>{checkIn || "Not set"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ color: "#7f8c8d" }}>Check-out:</span>
              <span style={{ fontWeight: "bold" }}>{checkOut || "Not set"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <span style={{ color: "#7f8c8d" }}>Rooms:</span>
              <span style={{ fontWeight: "bold" }}>{numberOfRooms}</span>
            </div>
            <div style={{ borderTop: "1px solid #ecf0f1", paddingTop: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.5rem", fontWeight: "bold", className: styles.totalPrice }}>
                <span>Total:</span>
                <span>R {totalPrice.toFixed(2)}</span>
              </div>
              <p style={{ color: "#95a5a6", fontSize: "0.8rem", textAlign: "right" }}>
                Includes all taxes and fees
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
