import React, { useEffect } from "react";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";
import SearchBar from "../../components/Searchbar/Searchbar";
import { useNavigate } from "react-router-dom";
import { getLocalUser } from "../../utils/LocalStorage";

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = getLocalUser();

  // useEffect
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return (
    <div>
      <Navbar />
      <SearchBar placeholder="Search..." />
      <Footer />
    </div>
  );
};
export default UserDashboard;
