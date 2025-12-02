import Tag from "../../components/Tag/Tag";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Gallery from "../../components/Gallery/Gallery";
import IconButton from "../../components/Iconbutton/Iconbutton";
import { SlShare } from "react-icons/sl";
import { FiMail, FiLink } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import Button from "../../components/Button/Button";
import Map, { type Hotel } from "../../components/map/Map";
import styles from "./AccomodationDetails.module.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccomodationById } from "../../features/accomodationSlice";

const hotels: Hotel[] = [
  { id: 1, name: "Hotel 1", position: [420, 120], address: "Average" },
  { id: 2, name: "Hotel 2", position: [100, 120], address: "Good" },
  { id: 3, name: "Hotel 3", position: [300, 120], address: "Bad" },
];

export default function AccomodationDetails() {
  const { id } = useParams<{ id: string }>();
  const hotelId = parseInt(id || "0");
  const [liked, setLiked] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { current, loading, error } = useSelector(
    (state: RootState) => state.accomodation
  );

  useEffect(() => {
    dispatch(fetchAccomodationById(id!));
  }, [id]);

  // Load initial liked state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      const favSet = new Set(JSON.parse(stored));
      setLiked(favSet.has(hotelId));
    }
  }, [hotelId]);

  const toggleLike = () => {
    const stored = localStorage.getItem("favorites");
    const favSet = stored ? new Set(JSON.parse(stored)) : new Set();

    if (favSet.has(hotelId)) {
      favSet.delete(hotelId);
      setLiked(false);
    } else {
      favSet.add(hotelId);
      setLiked(true);
    }

    localStorage.setItem("favorites", JSON.stringify([...favSet]));

    // Redirect to favorites page
    navigate("/myfavorites");
  };

  const shareViaGmail = () => {
    const subject = `Check out this hotel: ${current.name}`;
    const body = `Hi,\n\nI thought you might be interested in this hotel:\n\n${current.name}\n${current.description}\n\nLocation: ${current.physicaladdress}\n\nView details: ${window.location.href}\n\nBest regards`;
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`
    );
    setShowShare(false);
  };

  const shareViaWhatsApp = () => {
    const message = `Check out this hotel: ${current.name}\n${current.description}\nLocation: ${current.physicaladdress}\n${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
    setShowShare(false);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
    setShowShare(false);
  };

  return (
    <div
      className="accomodationPage"
      style={{ marginTop: "80px", padding: "2rem" }}
    >
      <main style={{ flex: 1 }}>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <div className="row">
              <div className="col-6">
                <div className={styles.titleRow}>
                  <h1 className={styles.title}>{current.name}</h1>
                  <IconButton
                    icon={SlShare}
                    onClick={() => setShowShare(true)}
                  />
                </div>

                <p className={styles.description}>{current.description}</p>
              </div>

              <div className="col-6">
                <Map hotels={hotels} center={[-29, 24]} />
              </div>
            </div>

            <div className="row" style={{ alignItems: "center" }}>
              <div className="col-6">
                <div style={{ display: "flex", margin: "1rem 0" }}>
                  {current.amenities.map((amenity: string) => (
                    <Tag text={amenity} key={amenity} />
                  ))}
                </div>
              </div>

              <div className="col-6">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <Link to={`/booking?accommodationId=${current.id}`}>
                    <Button width={100}>BOOK NOW</Button>
                  </Link>

                  {/* FAVORITE BUTTON */}
                  <button
                    onClick={toggleLike}
                    style={{
                      background: liked ? "#4A90E2" : "transparent",
                      border: "1px solid #4A90E2",
                      borderRadius: "4px",
                      padding: "0.5rem 1rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: liked ? "white" : "#4A90E2",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {liked ? <FaHeart /> : <FaRegHeart />}
                    {liked ? "Saved" : "Save"}
                  </button>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <Gallery images={current.imagegallery} />
              </div>

              <div className="col-6">
                <h2 style={{ padding: ".5rem 1rem" }}>Reviews</h2>
                <ReviewCard
                  reviewText="Great stay.."
                  reviewer="M.S Mwelase"
                  starRatings={3.5}
                  date="12 Dec 2023"
                />
              </div>
            </div>
          </>
        )}

        {/* SHARE MODAL */}
        {showShare && (
          <>
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1000,
              }}
              onClick={() => setShowShare(false)}
            />
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                zIndex: 1001,
                minWidth: "250px",
              }}
            >
              <h3 style={{ margin: "0 0 15px 0", textAlign: "center" }}>
                Share this hotel
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <button
                  onClick={shareViaGmail}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: "#f9f9f9",
                    cursor: "pointer",
                  }}
                >
                  <FiMail style={{ color: "#ea4335" }} /> Share via Gmail
                </button>
                <button
                  onClick={shareViaWhatsApp}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: "#f9f9f9",
                    cursor: "pointer",
                  }}
                >
                  <FaWhatsapp style={{ color: "#25d366" }} /> Share via WhatsApp
                </button>
                <button
                  onClick={copyLink}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: "#f9f9f9",
                    cursor: "pointer",
                  }}
                >
                  <FiLink /> Copy Link
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
