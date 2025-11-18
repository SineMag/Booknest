import { useState } from "react";
import "./App.css";
import HeroSection from "./components/heroSection/HeroSection";
import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/NavBar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />

      <Footer />
    </>
  );
}

export default App;
