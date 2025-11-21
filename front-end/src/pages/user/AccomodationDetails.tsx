import React from "react";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";
import Iconbutton from "../../components/Iconbutton/Iconbutton";
import ProfileIcon from "../../components/ProfileIcon/profileIcon";

const AccomodationDetails: React.FC = () => {
  return (
    <div>
      {/* <Navbar /> */}


      <Iconbutton onClick={() => console.log("Heart button clicked!")} />
      
      <Footer />
    </div>
  );
};

export default AccomodationDetails;
