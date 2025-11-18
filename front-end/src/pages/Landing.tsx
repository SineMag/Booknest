import React from "react";
import HeroSection from "../components/heroSection/HeroSection";
import Navbar from "../components/NavBar/Navbar";
import Footer from "../components/footer/Footer";

const Landing: React.FC = () => {
  return (
    <div>
        <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default Landing;
