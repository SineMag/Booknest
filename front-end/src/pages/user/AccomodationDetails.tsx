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
<<<<<<< HEAD

=======
>>>>>>> 9120336c2689eb086afd97b2a49e1c1e796dc3c2
const hotels: Hotel[] = [
  { id: 1, name: "Hotel 1", position: [420, 120], address: "Average" },
  { id: 2, name: "Hotel 2", position: [100, 120], address: "Good" },
  { id: 3, name: "Hotel 3", position: [300, 120], address: "Bad" },
];
<<<<<<< HEAD

export default function AccomodationDetails() {
  const { id } = useParams<{ id: string }>();
  const hotelId = parseInt(id || "0");

  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

=======
export default function AccomodationDetails() {
  const { id } = useParams<{ id: string }>();
  const hotelId = parseInt(id || "0");
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
>>>>>>> 9120336c2689eb086afd97b2a49e1c1e796dc3c2
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
<<<<<<< HEAD

    if (hotelId) loadFavoriteStatus();
  }, [hotelId]);

=======
    if (hotelId) loadFavoriteStatus();
  }, [hotelId]);
>>>>>>> 9120336c2689eb086afd97b2a49e1c1e796dc3c2
  // ----------------------------
  // LIKE / UNLIKE HOTEL
  // ----------------------------
  const onLiked = async () => {
    try {
      setLoading(true);
      setError("");
<<<<<<< HEAD

      // Toggle favorite in backend
      await toggleFavorite(hotelId, liked);

      // Update UI immediately
      setLiked((prev) => !prev);

=======
      // Toggle favorite in backend
      await toggleFavorite(hotelId, liked);
      // Update UI immediately
      setLiked((prev) => !prev);
>>>>>>> 9120336c2689eb086afd97b2a49e1c1e796dc3c2
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
<<<<<<< HEAD

=======
>>>>>>> 9120336c2689eb086afd97b2a49e1c1e796dc3c2
  // ----------------------------
  // SHARE FUNCTION
  // ----------------------------
  const onShare = async () => {
    const hotelName = "Blue Lagoon"; // Can be dynamic later
    const hotelDescription =
      "Offers relaxing coastal escape with modern, comfortable rooms, pool, beach access, and more!";
    const hotelUrl = window.location.href;
<<<<<<< HEAD

=======
>>>>>>> 9120336c2689eb086afd97b2a49e1c1e796dc3c2
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
<<<<<<< HEAD

=======
>>>>>>> 9120336c2689eb086afd97b2a49e1c1e796dc3c2
  // ----------------------------
  // PAGE RENDER
  // ----------------------------
  return (
    <div
      className="accomodationPage"
      style={{ marginTop: "80px", padding: "2rem" }}
    >
      <Navbar />
<<<<<<< HEAD

=======
>>>>>>> 9120336c2689eb086afd97b2a49e1c1e796dc3c2
      <main style={{ flex: 1 }}>
        <div className="row">
          <div className="col-6">
            <div className="row align-center">
              <div className="col-10">
                <h1 className={styles.title}>Blue Lagoon</h1>
              </div>
<<<<<<< HEAD

=======
>>>>>>> 9120336c2689eb086afd97b2a49e1c1e796dc3c2
              <div className="col-2">
                <div className="row">
                  {/* HEART ICON */}
                  <IconButton
                    icon={liked ? FaHeart : FaRegHeart}
                    onClick={onLiked}
                    isActive={liked}
                  />
<<<<<<< HEAD

=======
>>>>>>> 9120336c2689eb086afd97b2a49e1c1e796dc3c2
                  {/* SHARE ICON */}
                  <IconButton icon={SlShare} onClick={onShare} />
                </div>
              </div>
            </div>
<<<<<<< HEAD

=======
>>>>>>> 9120336c2689eb086afd97b2a49e1c1e796dc3c2
            <div className="row">
              <p className={styles.title}>
                Offers a relaxing coastal escape with modern, comfortable rooms
                and warm hospitality. Located just minutes from the beach, the
                hotel features spacious accommodations, a serene atmosphere, and
                amenities designed for both leisure and business travelers.
              </p>
            </div>
          </div>
<<<<<<< HEAD

=======
>>>>>>> 9120336c2689eb086afd97b2a49e1c1e796dc3c2
          {/* MAP SECTION */}
          <div className="col-6">
            <Map hotels={hotels} center={[-29, 24]} />
          </div>
        </div>
<<<<<<< HEAD

=======
>>>>>>> 9120336c2689eb086afd97b2a49e1c1e796dc3c2
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
<<<<<<< HEAD

=======
>>>>>>> 9120336c2689eb086afd97b2a49e1c1e796dc3c2
          <div className="col-6">
            <div
              style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
            >
              <Link to="/booking">
                <Button width={100}>BOOK NOW</Button>
              </Link>
<<<<<<< HEAD

=======
>>>>>>> 9120336c2689eb086afd97b2a49e1c1e796dc3c2
              {/* SAVE BUTTON */}
              <button
                onClick={onLiked}
                disabled={loading}
                style={{
<<<<<<< HEAD
                  background: liked ? "#4a90e2" : "transparent",
                  border: "1px solid #4a90e2",
=======
                  background: liked ? "#4A90E2" : "transparent",
                  border: "1px solid #4A90E2",
>>>>>>> 9120336c2689eb086afd97b2a49e1c1e796dc3c2
                  borderRadius: "4px",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
<<<<<<< HEAD
                  color: liked ? "white" : "#4a90e2",
=======
                  color: liked ? "white" : "#4A90E2",
>>>>>>> 9120336c2689eb086afd97b2a49e1c1e796dc3c2
                  transition: "all 0.2s ease",
                }}
              >
                {liked ? <FaHeart /> : <FaRegHeart />}
                {loading ? "Saving..." : liked ? "Saved" : "Save"}
              </button>
            </div>
<<<<<<< HEAD

=======
>>>>>>> 9120336c2689eb086afd97b2a49e1c1e796dc3c2
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
<<<<<<< HEAD

=======
>>>>>>> 9120336c2689eb086afd97b2a49e1c1e796dc3c2
        {/* GALLERY + REVIEWS */}
        <div className="row">
          <div className="col-6">
            <Gallery />
          </div>
<<<<<<< HEAD

=======
>>>>>>> 9120336c2689eb086afd97b2a49e1c1e796dc3c2
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
<<<<<<< HEAD

=======
>>>>>>> 9120336c2689eb086afd97b2a49e1c1e796dc3c2
      <Footer />
    </div>
  );
}





