import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaEye, FaHeart, FaShare } from "react-icons/fa";
import Button from "../../components/Button/Button";
import { Link } from "react-router";
import type { AppDispatch, RootState } from "../../../store";
import { fetchAccomodations } from "../../features/accomodationSlice";
import type { Accomodation } from "../../types/Accomodation";

interface Favorite {
  id: number;
  userId: number;
  accommodationId: number;
}

const MyFavorites: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { accomodations, loading } = useSelector(
    (state: RootState) => state.accomodation
  );
  const { user } = useSelector((state: RootState) => state.user);

  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loadingFavs, setLoadingFavs] = useState(true);

  // Fetch favorites from backend
  const fetchFavorites = async () => {
    try {
      const response = await fetch(
        `https://your-backend-url.com/api/favorites?userId=${user.id}`
      );
      const data = await response.json();
      setFavorites(data);
    } catch (err) {
      console.error("Failed to fetch favorites", err);
    } finally {
      setLoadingFavs(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchFavorites();
    }
    dispatch(fetchAccomodations());
  }, [dispatch, user]);

  const removeFavorite = async (favId: number) => {
    try {
      await fetch(`https://your-backend-url.com/api/favorites/${favId}`, {
        method: "DELETE",
      });
      setFavorites(favorites.filter((f) => f.id !== favId));
    } catch (err) {
      console.error("Failed to remove favorite", err);
    }
  };

  // Join backend favorites with accommodations list
  const favoriteHotels = accomodations.filter((hotel: Accomodation) =>
    favorites.some((fav) => fav.accommodationId === hotel.id)
  );

  return (
    <div className="fav-wrapper">
      <div className="fav-container">
        <div className="fav-header">
          <h1>My Favorites</h1>
        </div>

        {loading || loadingFavs ? (
          <div className="fav-loading">Loading...</div>
        ) : favoriteHotels.length === 0 ? (
          <div className="fav-empty">
            <h2>No favorites yet ❤️</h2>
            <p>Start adding accommodations to your favorites!</p>
          </div>
        ) : (
          <div className="fav-grid">
            {favoriteHotels.map((hotel: Accomodation) => {
              const favRecord = favorites.find(
                (f) => f.accommodationId === hotel.id
              );

              return (
                <div className="fav-card-grid" key={hotel.id}>
                  <img
                    src={hotel.imagegallery?.[0] ?? "/placeholder-hotel.jpg"}
                    alt={hotel.name}
                    className="fav-card-img"
                  />

                  <div className="fav-card-info">
                    <h3>{hotel.name}</h3>
                    <p>{hotel.physicaladdress}</p>
                  </div>

                  <div className="fav-card-actions">
                    <Link to={`/accomodation-details/${hotel.id}`}>
                      <Button>
                        <FaEye />
                      </Button>
                    </Link>

                    <Button>
                      <FaShare />
                    </Button>

                    <Button onClick={() => removeFavorite(favRecord!.id)}>
                      <FaHeart color="red" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;
