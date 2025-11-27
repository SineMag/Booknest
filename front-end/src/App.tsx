import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/footer/Footer";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import UserLogin from "./pages/user/UserLogin";
import Error404 from "../src/pages/user/Error404";
import UserRegister from "./pages/user/UserRegister";
import Booking from "./pages/user/Booking";
import UserDashboard from "./pages/user/UserDashboard";
import Confirmation from "./pages/user/Confirmation";
import MyBookings from "./pages/user/MyBookings";
import UserProfile from "./pages/user/UserProfile";
import MyFavorites from "./pages/user/MyFavorites";
import AccomodationDetails from "./pages/user/AccomodationDetails";
import AdminLogin from "./pages/admin/AdminLogin";

import AdminRegister from "./pages/admin/AdminRegister";
import InventoryManagement from "./pages/admin/InventoryManagement";
import ReservationManagement from "./pages/admin/ReservationManagement";
// import AdminLogin from "./pages/admin/AdminLogin";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<UserLogin />} />

        {/* User */}
        <Route path="/register" element={<UserRegister />} />
        <Route path="/booking/" element={<Booking />} />
        <Route path="/dashboard" element={<UserDashboard />} />

        <Route
          path="/accomodation-details/"
          element={<AccomodationDetails />}
        />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/my-favorites" element={<MyFavorites />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="*" element={<Error404 />} />

        {/* Admin */}

        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        {/* <Route path="/adminDashboard" element={<AdminDashboard />} /> */}
        <Route
          path="/inventory-management"
          element={<InventoryManagement />}
        />
        <Route
          path="/reservation-management"
          element={<ReservationManagement />}
        />

        {/* <Route path="/adminLogin" element={<AdminLogin />} /> */}
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;