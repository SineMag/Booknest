import "./App.css";
import {Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import UserLogin from "./pages/user/UserLogin";
import Error404 from "./pages/Error404";
import UserRegister from "./pages/user/UserRegister";
<<<<<<< HEAD
import Booking from "./pages/user/Booking";
=======
import ProfileMenu from "./components/ProfileMenu/profileMenu";
import Navbar from "./components/NavBar/Navbar";
import ProfileIcon from "./components/ProfileIcon/profileIcon";
>>>>>>> eb9db716bfcede9f423b1b3c00cf4db4e8a9a269
// import UserDashboard from "./pages/user/UserDashboard";
// import AccomodationDetails from "./pages/user/AccomodationDetails";
// import Confirmation from "./pages/user/Confirmation";
// import MyBookings from "./pages/user/MyBookings";
import Profile from "./pages/user/UserProfile";
import UserProfile from "./pages/user/UserProfile";

function App() {
  return (
    <>
// <Navbar/>
<ProfileIcon/>

    
    
      <Routes> 
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/booking" element={<Booking />} />
        {/* <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/accomodation-details" element={<AccomodationDetails />} /> */}
        {/* <Route path="/confirmation" element={<Confirmation />} /> */}
        {/* <Route path="/my-bookings" element={<MyBookings />} /> */}
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<Error404 />} />
      </Routes> 
    </>
  );
}
export default App;
