import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";
import styles from "./AccomodationDetails.module.css";

export default function AccommodationDetails() {
  const { id } = useParams<{ id: string }>();
  const hotelId = Number(id);
  const navigate = useNavigate();

  const hotel = useSelector((state: RootState) =>
    state.hotels.hotels.find((h) => h.id === hotelId)
  );

  if (!hotel)
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        Hotel not found.
      </h2>
    );

  const handleDelete = (id: number) => {
    // Use your existing delete API logic here
    if (confirm("Are you sure you want to delete this hotel?")) {
      console.log("Delete hotel:", id);
    }
  };

  return (
    <div>
      <Navbar />

      <div className={styles.headerSection}>
        <h1 className={styles.hotelName}>{hotel.name}</h1>
        <div className={styles.hotelLocation}>{hotel.physicaladdress}</div>
        <div className={styles.ratingRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={i < hotel.rating ? styles.starActive : styles.star}
            >
              ★
            </span>
          ))}
          <span className={styles.ratingText}>{hotel.rating}/5</span>
        </div>
      </div>

      <div className={styles.galleryGrid}>
        {hotel.imagegallery.map((img, i) => (
          <img key={i} src={img} alt="" className={styles.galleryImg} />
        ))}
      </div>

      <div className={styles.contentWrapper}>
        {/* LEFT CONTENT */}
        <div className={styles.leftColumn}>
          <h2>About This Accommodation</h2>
          <p className={styles.description}>{hotel.description}</p>

          <h3>Amenities</h3>
          <div className={styles.amenitiesGrid}>
            {hotel.amenities.map((am, i) => (
              <div key={i} className={styles.amenityItem}>
                • {am}
              </div>
            ))}
          </div>

          <h3>Room Types</h3>
          <ul className={styles.roomList}>
            {hotel.roomtypes.map((rt, i) => (
              <li key={i}>{rt}</li>
            ))}
          </ul>

          <h3>Contact</h3>
          <p>Email: {hotel.emailaddress}</p>
          <p>Phone: {hotel.phonenumber}</p>
        </div>

        {/* RIGHT SIDEBAR (Booking-style panel) */}
        <div className={styles.bookingCard}>
          <h3 className={styles.cardTitle}>Manage Listing</h3>

          <button
            className={`${styles.actionBtn} ${styles.editBtn}`}
            onClick={() => navigate(`/admin/edit/${hotel.id}`)}
          >
            Edit
          </button>

          <button
            className={`${styles.actionBtn} ${styles.deleteBtn}`}
            onClick={() => handleDelete(hotel.id)}
          >
            Delete
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
