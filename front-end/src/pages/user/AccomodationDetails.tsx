import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";
import Tag from "../../components/Tag/Tag";
import { TiWiFi } from "react-icons/ti";
import { FaParking, FaSwimmingPool, FaHeart, FaRegHeart } from "react-icons/fa";
import { GiBeachBucket } from "react-icons/gi";
import { BiDrink } from "react-icons/bi";
import Gallery from "../../components/Gallery/Gallery";
import IconButton from "../../components/Iconbutton/Iconbutton";
import { SlShare } from "react-icons/sl";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import Button from "../../components/Button/Button";
import Map, { type Hotel } from "../../components/map/Map";
import styles from "./AccomodationDetails.module.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFavorites, toggleFavorite } from "../../service/api";

const hotels: Hotel[] = [
  { id: 1, name: "Hotel 1", position: [420, 120], address: "Average" },
  { id: 2, name: "Hotel 2", position: [100, 120], address: "Good" },
  { id: 3, name: "Hotel 3", position: [300, 120], address: "Bad" },
];

export default function AccomodationDetails() {
  const { id } = useParams<{ id: string }>();
  const hotelId = parseInt(id || "0");

  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ----------------------------
  // CHECK IF HOTEL IS ALREADY FAVORITE
  // ----------------------------
  useEffect(() => {
    const loadFavoriteStatus = async () => {
      try {
        const response = await getFavorites();
        const favorites = response.data;
        const isLiked = favorites.some((fav: any) => fav.hotelId === hotelId);
        setLiked(isLiked);
      } catch (err) {
        console.error("Failed to load favorites:", err);
      }
    };

    if (hotelId) loadFavoriteStatus();
  }, [hotelId]);

  // ----------------------------
  // LIKE / UNLIKE HOTEL
  // ----------------------------
  const onLiked = async () => {
    try {
      setLoading(true);
      setError("");

      // Toggle favorite in backend
      await toggleFavorite(hotelId, liked);

      // Update UI immediately
      setLiked((prev) => !prev);

      // Trigger global state refresh for MyFavorites
      const event = new CustomEvent("favoriteUpdated");
      window.dispatchEvent(event);
    } catch (err) {
      setError("Failed to update favorites");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // SHARE FUNCTION
  // ----------------------------
  const onShare = async () => {
    const hotelName = "Blue Lagoon"; // Can be dynamic later
    const hotelDescription =
      "Offers relaxing coastal escape with modern, comfortable rooms, pool, beach access, and more!";
    const hotelUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: hotelName,
          text: hotelDescription,
          url: hotelUrl,
        });
      } catch {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: open email client
      const subject = encodeURIComponent(`Check out ${hotelName}`);
      const body = encodeURIComponent(
        `${hotelDescription}\n\nMore details: ${hotelUrl}`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
  };

  // ----------------------------
  // PAGE RENDER
  // ----------------------------
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
                  {/* HEART ICON */}
                  <IconButton
                    icon={liked ? FaHeart : FaRegHeart}
                    onClick={onLiked}
                    isActive={liked}
                  />

                  {/* SHARE ICON */}
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
              </p>
            </div>
          </div>

          {/* MAP SECTION */}
          <div className="col-6">
            <Map hotels={hotels} center={[-29, 24]} />
          </div>
        </div>

        {/* TAGS & SAVE BUTTON */}
        <div className="row" style={{ alignItems: "center" }}>
          <div className="col-6">
            <div style={{ display: "flex", margin: "1rem 0" }}>
              <Tag text="Free Wifi" icon={TiWiFi} />
              <Tag text="Swimming Pool" icon={FaSwimmingPool} />
              <Tag text="Parking" icon={FaParking} />
              <Tag text="Beachfront" icon={GiBeachBucket} />
              <Tag text="Bar" icon={BiDrink} />
            </div>
          </div>

          <div className="col-6">
            <div
              style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
            >
              <Link to="/booking">
                <Button width={100}>BOOK NOW</Button>
              </Link>

              {/* SAVE BUTTON */}
              <button
                onClick={onLiked}
                disabled={loading}
                style={{
                  background: liked ? "#4a90e2" : "transparent",
                  border: "1px solid #4a90e2",
                  borderRadius: "4px",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: liked ? "white" : "#4a90e2",
                  transition: "all 0.2s ease",
                }}
              >
                {liked ? <FaHeart /> : <FaRegHeart />}
                {loading ? "Saving..." : liked ? "Saved" : "Save"}
              </button>
            </div>

            {error && (
              <div
                style={{
                  color: "red",
                  textAlign: "center",
                  marginTop: "0.5rem",
                }}
              >
                {error}
              </div>
            )}
          </div>
        </div>

        {/* GALLERY + REVIEWS */}
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
