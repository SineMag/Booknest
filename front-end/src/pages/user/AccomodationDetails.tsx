import Tag from "../../components/Tag/Tag";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Gallery from "../../components/Gallery/Gallery";
import IconButton from "../../components/Iconbutton/Iconbutton";
import { SlShare } from "react-icons/sl";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import Button from "../../components/Button/Button";
import Map, { type Hotel } from "../../components/map/Map";
import styles from "./AccomodationDetails.module.css";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccomodationById } from "../../features/accomodationSlice";
import {
  addToFavourites,
  getFavouriteByUserId,
  removeFavourite,
} from "../../features/favoriteSlice";

const hotels: Hotel[] = [
  { id: 1, name: "Hotel 1", position: [420, 120], address: "Average" },
  { id: 2, name: "Hotel 2", position: [100, 120], address: "Good" },
  { id: 3, name: "Hotel 3", position: [300, 120], address: "Bad" },
];

export default function AccomodationDetails() {
  const { id } = useParams<{ id: string }>();
  const hotelId = parseInt(id || "0");

  const dispatch = useDispatch<AppDispatch>();

  const { current, loading } = useSelector(
    (state: RootState) => state.accomodation
  );

  useEffect(() => {
    dispatch(fetchAccomodationById(id!));
  }, [id]);

  // USER + FAVORITES
  const { user } = useSelector((state: RootState) => state.user);
  const currentUserId = user?.id;

  const { favorites } = useSelector((state: RootState) => state.favorites);

  useEffect(() => {
    if (currentUserId) {
      dispatch(getFavouriteByUserId(currentUserId));
    }
  }, [dispatch, currentUserId]);

  // Find favorite record for THIS accommodation
  const matchedFavorite = favorites.find(
    (fav) => fav.accommodationId === hotelId && fav.userId === currentUserId
  );

  const isFavorite = !!matchedFavorite;
  const favouriteId = matchedFavorite?.id || null;

  // ********************
  // TOGGLE FAVORITE
  // ********************
  const toggleLike = () => {
    if (!currentUserId) {
      alert("No user ID found. Please log in.");
      return;
    }

    if (isFavorite && favouriteId) {
      dispatch(removeFavourite(favouriteId));
    } else {
      dispatch(
        addToFavourites({
          userId: currentUserId,
          accommodationId: hotelId,
        })
      );
    }
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
                  <IconButton icon={SlShare} onClick={() => {}} />
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
                      background: isFavorite ? "#4A90E2" : "transparent",
                      border: "1px solid #4A90E2",
                      borderRadius: "4px",
                      padding: "0.5rem 1rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: isFavorite ? "white" : "#4A90E2",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {isFavorite ? <FaHeart /> : <FaRegHeart />}
                    {isFavorite ? "Saved" : "Save"}
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
      </main>
    </div>
  );
}
