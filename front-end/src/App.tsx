import { useState } from "react";
import "./App.css";
import HeroSection from "./components/heroSection/HeroSection";
import Footer from "./components/footer/Footer";
import Snackbar from "./components/Snackbar/snackbar";
import Navbar from "./components/NavBar/Navbar";
import InputFields from "./components/InputFields/InputFields";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <InputFields />
      <HeroSection />
      <Snackbar />
      <Footer />
    </>
  );
}

export default App;
