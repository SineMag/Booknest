import "./App.css";
import HeroSection from "./components/heroSection/HeroSection";
import Footer from "./components/footer/Footer";
import Navbar from "./components/NavBar/Navbar";
import InputFields from "./components/InputFields/InputFields";
import UserRegister from "./pages/user/UserRegister";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <HeroSection />

      <Routes>
        <Route path="/register" element={<UserRegister />} />
      </Routes>

      <InputFields />
      <Footer />
    </Router>
  );
}

export default App;
