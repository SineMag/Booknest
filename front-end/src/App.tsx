import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserLogin from "./pages/user/UserLogin";
import Landing from "./pages/Landing";
import UserLogin from "./pages/user/UserLogin";
import Error404 from "./pages/Error404";
import UserRegister from "./pages/user/UserRegister";
import Booking from "./pages/user/Booking";
import UserDashboard from "./pages/user/UserDashboard";
import Confirmation from "./pages/user/Confirmation";
import MyBookings from "./pages/user/MyBookings";
import UserProfile from "./pages/user/UserProfile";
import MyFavorites from "./pages/user/MyFavorites";
import AccomodationDetails from "./pages/user/AccomodationDetails";
import AdminRegister from "./pages/admin/AdminRegister";
// import AdminLogin from "./pages/admin/AdminLogin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/booking/:accommodationId" element={<Booking />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route
          path="/accomodation-details/:accommodationId"
          element={<AccomodationDetails />}
        />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/my-favorites" element={<MyFavorites />} />
        <Route path="/adminRegister" element={<AdminRegister />} />
        {/* <Route path="/adminLogin" element={<AdminLogin />} /> */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;