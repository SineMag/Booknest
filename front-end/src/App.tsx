import './App.css'
import HeroSection from './components/heroSection/HeroSection'
import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from './components/NavBar/Navbar';
import InputFields from './components/InputFields/InputFields';
import NavProfile from './components/NavProfile/NavProfile';


function App() {
  return (
    <>
      <HeroSection />

      <Navbar />
      <NavProfile />
      <Footer />
      <InputFields />

      <Navbar />
      <HeroSection />
      <Footer />
    </>
  );
}

export default App;
