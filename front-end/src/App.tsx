import { useState } from "react";
import "./App.css";
import HeroSection from "./components/heroSection/HeroSection";
import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/NavBar/Navbar";
import Image from "./components/image/ImageUploader";

function App() {
  return (
    <>
      <HeroSection />

      <Navbar />
      <Footer />
    </>
  );
}

export default App;
