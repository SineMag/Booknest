import React, { useState, useEffect } from "react";
import {
  FaWifi,
  FaSwimmingPool,
  FaUtensils,
  FaParking,
  FaSpa,
  FaConciergeBell,
} from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import HeroSection from "../components/heroSection/HeroSection";
import Navbar from "../components/NavBar/Navbar";
import Footer from "../components/footer/Footer";
import SnackbarComponent from "../components/Snackbar/snackbar";
import Button from "../components/Button/Button";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import ReviewCard from "../components/ReviewCard/ReviewCard";
import ReviewModal from "../components/ReviewModal/ReviewModal";
import PaymentButton from "../components/PaymentButton";

const Landing: React.FC = () => {
  const userData = useSelector((state: RootState) => state.user);
  const user = userData ? userData.user : null;
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 2)),
      key: "selection",
    },
  ]);

  const recommendedHotels = [
    {
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      title: "Luxury Beach Resort",
      location: "Durban, KwaZulu-Natal",
      price: "R4299",
      rating: 4.8,
      description:
        "Experience ultimate luxury with ocean views, private beach access, and world-class amenities.",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo-fplMdzubdT3s_1rVfc7m-qT0xhVq67VBg&s",
      title: "Mountain View Lodge",
      location: "Cape Town, Western Cape",
      price: "R3249",
      rating: 4.7,
      description:
        "Nestled in the heart of the mountains, perfect for nature lovers and adventure seekers.",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW9O7VQ1XL8XGSMqMAUdQ7iy3eS1iqMtPnlw&s",
      title: "Urban Oasis Hotel",
      location: "Sandton, Pretoria",
      price: "R5349",
      rating: 4.9,
      description:
        "Modern luxury in the heart of the city, steps away from major attractions and business centers.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      title: "Toti",
      location: "Durban, KwaZulu-Natal",
      price: "R2349",
      rating: 4.9,
      description:
        "Modern luxury in the heart of the city, steps away from major attractions and business centers.",
    },
  ];

//   const MainContent = styled.div`
//   padding-top: 80px;
//   min-height: 100vh;
//   width: 100%;
// `;

  const testimonials = [
    {
      name: "John D.",
      stay: "Deluxe Room",
      comment:
        "Amazing experience! The staff was incredibly helpful and the room was spotless.",
    },
    {
      name: "Sarah M.",
      stay: "Family Suite",
      comment:
        "Perfect for our family vacation. Kids loved the pool and the central location was great.",
    },
    {
      name: "Michael T.",
      stay: "Business Suite",
      comment: "Great amenities and fast WiFi. Perfect for business travelers.",
    },
  ];

  useEffect(() => {
    if (!user) {
      setShowSnackbar(true);
    }
  }, [user]);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleOpenReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  return (
    <div>

  <Navbar />
  
      <HeroSection />
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Button onClick={handleOpenReviewModal}>Write a Review</Button>
      </div>
      <SnackbarComponent
        message="Register or log in first"
        show={showSnackbar}
        onClose={handleCloseSnackbar}
      />
      <PaymentButton />

      <Footer />
    </div>
  );
};

export default Landing;
