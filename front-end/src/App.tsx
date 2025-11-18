import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/NavBar/Navbar";
<<<<<<< HEAD
import Image from "./components/image/ImageUploader";

function App() {
  return (
    <>
    

      
      <Navbar />
      <HeroSection />

      <Footer />
    </>
=======
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
>>>>>>> 14cff4b7808fe2537a6d76b2606054612adc10f5
  );
}

export default App;

