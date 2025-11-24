import React from "react";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";
import Iconbutton from "../../components/Iconbutton/Iconbutton";
import Map from "../../components/map/Map";

const AccomodationDetails: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Iconbutton onClick={() => console.log("Heart button clicked!")} />
      <Map hotels={[]} center={[51.505, -0.09]} />
      <Footer />
    </div>
  );
};

export default AccomodationDetails;
