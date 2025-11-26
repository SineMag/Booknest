import React, { useState, useEffect } from "react";
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
      {/* <ReviewModal isOpen={isReviewModalOpen} onClose={handleCloseReviewModal} /> */}
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
