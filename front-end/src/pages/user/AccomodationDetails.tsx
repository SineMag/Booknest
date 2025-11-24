import React from "react";
import Footer from "../../components/footer/Footer";
import Iconbutton from "../../components/Iconbutton/Iconbutton";
import Gallery from "../../components/Gallery/Gallery";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import Tag from "../../components/Tag/Tag"
import { TiWiFi } from "react-icons/ti";
import { FaParking, FaSwimmingPool } from "react-icons/fa";
import { GiBeachBucket } from "react-icons/gi";
import { BiDrink } from "react-icons/bi";
import Button from "../../components/Button/Button";


// COMPONENT
const AccommodationDetails: React.FC = () => {
  return (
    <div className="page-wrapper">
  {/* <Navbar /> */}

  <div className="columns-wrapper">
   
    {/* Left Column */}
    <div className="left-column">
       <h1>Blue Lagoon</h1>
       <p>Offers a relaxing coastal escape with modern, comfortable rooms and warm hospitality. Located just minutes from the beach, the hotel features spacious accommodations, a serene atmosphere, and amenities designed for both leisure and business travelers. Guests can enjoy on-site dining, free Wi-Fi, scenic outdoor spaces, and convenient access to nearby attractions. Whether you’re seeking a peaceful getaway or a stylish base for exploring the area, Blue Lagoon promises a refreshing and memorable stay.</p>
      <Tag text="Free Wifi" icon={TiWiFi}/>
      <Tag text="Swimming Pool" icon={FaSwimmingPool}/>
      <Tag text="Parking" icon={FaParking}/>
      <Tag text="Beachfront" icon={GiBeachBucket}/>
      <Tag text="Bar" icon={BiDrink}/>
      <Gallery />
       <div className="icon-button">
        <Iconbutton
          onClick={() => console.log("Heart button clicked!")}
        />
      </div>
    </div>

    {/* Right Column */}
    <div className="right-column">
      <Button children= "Book Now"/>

      <div className="mapAndReview">
        <ReviewCard starRatings={4} reviewText="Good" reviewer="Sne" date="12 Dec 2022"/>
      </div>
    </div>
  </div>

  <Footer />
</div>
  );
};

export default AccommodationDetails;
