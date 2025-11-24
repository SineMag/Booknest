import React from "react";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";
import Tag from "../../components/Tag/Tag";
import { TiWiFi } from "react-icons/ti";
import { FaParking, FaSwimmingPool } from "react-icons/fa";
import { GiBeachBucket } from "react-icons/gi";
import { BiDrink, BiHeart } from "react-icons/bi";
import Gallery from "../../components/Gallery/Gallery";
import IconButton from "../../components/Iconbutton/Iconbutton";
import { SlShare } from "react-icons/sl";

export default function AccDetails() {
  function onLiked() {}
  return (
    <div className="accomodationPage" style={{ marginTop: "80px" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <div className="row">
          <div className="col-6">
            <div className="row">
              <div className="col-10">
                <h1>Blue Lagoon</h1>
              </div>
              <div className="col-2">
                <div className="row">
                  <IconButton icon={BiHeart} onClick={onLiked} />
                  <IconButton icon={SlShare} onClick={onLiked} />
                </div>
              </div>
            </div>
            <div className="row">
              <p>
                Offers a relaxing coastal escape with modern, comfortable rooms
                and warm hospitality. Located just minutes from the beach, the
                hotel features spacious accommodations, a serene atmosphere, and
                amenities designed for both leisure and business travelers.
                Guests can enjoy on-site dining, free Wi-Fi, scenic outdoor
                spaces, and convenient access to nearby attractions. Whether
                you’re seeking a peaceful getaway or a stylish base for
                exploring the area, Blue Lagoon promises a refreshing and
                memorable stay.
              </p>
            </div>
          </div>
          <div className="col-6">2</div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="row">
              <Tag text="Free Wifi" icon={TiWiFi} />
              <Tag text="Swimming Pool" icon={FaSwimmingPool} />
              <Tag text="Parking" icon={FaParking} />
              <Tag text="Beachfront" icon={GiBeachBucket} />
              <Tag text="Bar" icon={BiDrink} />
            </div>
          </div>
          <div className="col-6">4</div>
        </div>
        <div className="row">
          <div className="col-6">
            <Gallery />
          </div>
          <div className="col-6">6</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
