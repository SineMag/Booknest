<<<<<<< HEAD
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/NavBar/Navbar";
import Landing from "./pages/Landing";
// Layout Component
const Layout = () => (
  <>
    <Navbar />
    <Outlet /> 
    <Footer />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="admin" element={<Outlet />}>
          </Route>
          <Route path="user" element={<Outlet />}>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
=======
import './App.css'
import HeroSection from './components/heroSection/HeroSection'
import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from './components/NavBar/Navbar';
import InputFields from './components/InputFields/InputFields';


function App() {
  return (
    <>

     <HeroSection/>
        
      < Navbar />
      <Footer />
      <InputFields />
      
      <Navbar />
       <HeroSection />
      <Footer />

    </>
>>>>>>> 5ccc86c3562663252c47bff78597413e8845b3a8
  );
}

export default App;

