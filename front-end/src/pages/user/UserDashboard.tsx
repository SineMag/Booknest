import React from "react";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";
import SearchBar from "../../components/Searchbar/Searchbar";
const UserDashboard: React.FC = () => {
  return (
    <div>
      <Navbar />
      <SearchBar placeholder="Search..." />
      <Footer />
    </div>
  );
};
export default UserDashboard;
