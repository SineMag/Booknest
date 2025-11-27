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
      <div className={styles["details-container"]}>
        <Link to="/admin/inventory" className={styles["back-btn"]}>
          ⬅ Back
        </Link>

        <h2>{hotel.name}</h2>

        <div className={styles["details-gallery"]}>
          {hotel.imagegallery.map((img, i) => (
            <img key={i} src={img} alt="" className={styles["detail-img"]} />
          ))}
        </div>

        <p>
          <strong>Description:</strong> {hotel.description}
        </p>
        <p>
          <strong>Location:</strong> {hotel.physicaladdress}
        </p>
        <p>
          <strong>Email:</strong> {hotel.emailaddress}
        </p>
        <p>
          <strong>Phone:</strong> {hotel.phonenumber}
        </p>

        <h3>Amenities</h3>
        <ul>
          {hotel.amenities.map((am, i) => (
            <li key={i}>{am}</li>
          ))}
        </ul>

        <h3>Room Types</h3>
        <ul>
          {hotel.roomtypes.map((rt, i) => (
            <li key={i}>{rt}</li>
          ))}
        </ul>

        <h3>Rating</h3>
        <div className={styles["star-rating"]}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < hotel.rating ? "star active" : "star"}>
              ★
            </span>
          ))}
        </div>

        {/* Admin Actions */}
        <div className={styles["admin-actions"]}>
          <button
            className={`${styles["admin-btn"]} ${styles.edit}`}
            onClick={() => navigate(`/admin/edit/${hotel.id}`)}
          >
            Edit
          </button>
          <button
            className={`${styles["admin-btn"]} ${styles.delete}`}
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
