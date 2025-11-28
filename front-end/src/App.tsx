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
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRegister from "./pages/admin/AdminRegister";
import InventoryManagement from "./pages/admin/InventoryManagement";
<<<<<<< HEAD
import AccommodationDetails from "./pages/user/AccomodationDetails";
=======
import ReservationManagement from "./pages/admin/ReservationManagement";
>>>>>>> 1705dc023795d18461054db4067ee2690dde99d6
// import AdminLogin from "./pages/admin/AdminLogin";

function App() {
  return (
    <>
<<<<<<< HEAD
=======
      <Navbar />
>>>>>>> 1705dc023795d18461054db4067ee2690dde99d6
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

<<<<<<< HEAD
        <Route path="/adminRegister" element={<AdminRegister />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminDashboard" element={<UserDashboard />} />
        <Route
          path="/accommodation-details/:id"
          element={<AccommodationDetails />}
        />

        {/* <Route path="/adminDashboard" element={<AdminDashboard />} /> */}
        <Route path="/inventoryManagement" element={<InventoryManagement />} />
        {/* <Route path="/reservationManagement" element={<ReservationManagement />} /> */}
=======
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route
          path="/inventory-management"
          element={<InventoryManagement />}
        />
        <Route
          path="/reservation-management"
          element={<ReservationManagement />}
        />
>>>>>>> 1705dc023795d18461054db4067ee2690dde99d6

        {/* <Route path="/adminLogin" element={<AdminLogin />} /> */}
        <Route path="*" element={<Error404 />} />
      </Routes>
<<<<<<< HEAD
=======
      <Footer />
>>>>>>> 1705dc023795d18461054db4067ee2690dde99d6
    </>
  );
}

export default App;