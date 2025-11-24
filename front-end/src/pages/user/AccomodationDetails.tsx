import React from "react";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";
import Iconbutton from "../../components/Iconbutton/Iconbutton";
import Gallery from "../../components/Gallery/Gallery";
import ReviewCard from "../../components/ReviewCard/ReviewCard";

const AccommodationDetails: React.FC = () => {
  return (
    <div className="page-wrapper">
  {/* <Navbar /> */}

  <div className="columns-wrapper">
    
    {/* Left Column */}
    <div className="left-column">
      <Gallery />
    </div>

    {/* Right Column */}
    <div className="right-column">
      <div className="icon-button">
        <Iconbutton
          onClick={() => console.log("Heart button clicked!")}
        />
      </div>

      <div className="mapAndReview">
        <ReviewCard />
      </div>
    </div>
  </div>

  <Footer />
</div>
  );
};

export default AccommodationDetails;
