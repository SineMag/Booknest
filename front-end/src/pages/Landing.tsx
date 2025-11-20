import React, { useState, useEffect } from "react";
import HeroSection from "../components/heroSection/HeroSection";
import Navbar from "../components/NavBar/Navbar";
import Footer from "../components/footer/Footer";
import SnackbarComponent from "../components/Snackbar/snackbar";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const Landing: React.FC = () => {
  const userData = useSelector((state: RootState) => state.user);
  const user = userData ? userData.user : null;
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowSnackbar(true);
    }
  }, [user]);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <div>
      <Navbar />
      <HeroSection />
      <SnackbarComponent
        message="Register or log in first"
        show={showSnackbar}
        onClose={handleCloseSnackbar}
      />
      <Footer />
    </div>
  );
};

export default Landing;
