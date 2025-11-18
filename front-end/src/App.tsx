import { useState } from "react";
import "./App.css";
import HeroSection from "./components/heroSection/HeroSection";
import Footer from "./components/footer/Footer";
import Snackbar from "./components/Snackbar/snackbar";
import Navbar from "./components/NavBar/Navbar";

function App() {
  return (
    <>
     <Snackbar/>
      <Navbar />
       <HeroSection />
      <Footer />
    </>
  );
}

export default App;
