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
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import Button from "../../components/Button/Button";
import Map, { type Hotel } from "../../components/map/Map";
import styles from "./AccomodationDetails.module.css";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

const hotels: Hotel[] = [
  {
    id: 1,
    name: "Hotel 1",
    position: [420, 120],
    address: "Average",
  },
  {
    id: 1,
    name: "Hotel 1",
    position: [100, 120],
    address: "Good",
  },
  {
    id: 1,
    name: "Hotel 1",
    position: [300, 120],
    address: "Bad",
  },
];

export default function AccomodationDetails() {
  const { accommodationId: accommodationIdParam } = useParams<{
    accommodationId: string;
  }>();
  const accommodationId = accommodationIdParam
    ? parseInt(accommodationIdParam, 10)
    : undefined;
  const [liked, setLiked] = useState(false);

  const onLiked = () => {
    setLiked(!liked);
  };

  const onShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Blue Lagoon Hotel",
          text: "Check out this beautiful hotel!",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      alert("Sharing not supported on this browser.");
    }
  };
  return (
    <div
      className="accomodationPage"
      style={{ marginTop: "80px", padding: "2rem" }}
    >
      <Navbar />
      <main style={{ flex: 1 }}>
        <div className="row">
          <div className="col-6">
            <div className="row align-center">
              <div className="col-10">
                <h1 className={styles.title}>Blue Lagoon</h1>
              </div>
              <div className="col-2">
                <div className="row">
                  <IconButton
                    icon={BiHeart}
                    onClick={onLiked}
                    isActive={liked}
                  />

                  <IconButton icon={SlShare} onClick={onShare} />
                </div>
              </div>
            </div>
            <div className="row">
              <p className={styles.title}>
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
          <div className="col-6">
            <Map hotels={hotels} center={[-29, 24]} />
          </div>
        </div>
        <div className="row" style={{ alignItems: "center" }}>
          <div className="col-6">
            <div
              style={{
                display: "flex",
                margin: "1rem 0",
              }}
            >
              <Tag text="Free Wifi" icon={TiWiFi} />
              <Tag text="Swimming Pool" icon={FaSwimmingPool} />
              <Tag text="Parking" icon={FaParking} />
              <Tag text="Beachfront" icon={GiBeachBucket} />
              <Tag text="Bar" icon={BiDrink} />
            </div>
          </div>
          <div className="col-6">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link
                to={
                  accommodationId ? `/booking/${accommodationId}` : "/booking"
                }
              >
                <Button width={100}>BOOK NOW</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <Gallery />
          </div>
          <div className="col-6">
            <h2 style={{ padding: ".5rem 1rem" }}>Reviews</h2>
            <ReviewCard
              reviewText="Great stay.."
              reviewer="M.S Mwelase"
              starRatings={3.5}
              date="12 Dec 2023"
            />
            <ReviewCard
              reviewText="Great stay.."
              reviewer="M.S Mwelase"
              starRatings={3.5}
              date="12 Dec 2023"
            />
            <ReviewCard
              reviewText="Great stay.."
              reviewer="M.S Mwelase"
              starRatings={3.5}
              date="12 Dec 2023"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
