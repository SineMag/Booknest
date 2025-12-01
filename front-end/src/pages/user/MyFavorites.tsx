import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaEye, FaHeart, FaShare } from "react-icons/fa";
import Button from "../../components/Button/Button";
import { Link } from "react-router";
import type { AppDispatch, RootState } from "../../../store";
import { fetchAccomodations } from "../../features/accomodationSlice";
import type { Accomodation } from "../../types/Accomodation";

const MyFavorites: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const { accomodations, loading } = useSelector(
    (state: RootState) => state.accomodation
  );

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(new Set(JSON.parse(stored)));
  }, []);

  useEffect(() => {
    dispatch(fetchAccomodations());
  }, [dispatch]);

  const favoriteHotels = accomodations.filter((hotel: Accomodation) =>
    favorites.has(hotel.id!)
  );

  const removeFavorite = (id: number) => {
    const newFavs = new Set(favorites);
    newFavs.delete(id);
    setFavorites(newFavs);
    localStorage.setItem("favorites", JSON.stringify([...newFavs]));
  };

  return (
    <div className="fav-wrapper">
      <div className="fav-container">
        <div className="fav-header">
          <h1>My Favorites</h1>
        </div>

        {loading ? (
          <div className="fav-loading">Loading...</div>
        ) : favoriteHotels.length === 0 ? (
          <div className="fav-empty">
            <h2>No favorites yet ❤️</h2>
            <p>Start adding accommodations to your favorites!</p>
          </div>
        ) : (
          <div className="fav-grid">
            {favoriteHotels.map((hotel: Accomodation) => (
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
                  <Link to={`/accomodation-details/:id`}>
                    <Button>
                      <FaEye />
                    </Button>
                  </Link>

                  <Button>
                    <FaShare />
                  </Button>
                  <Button onClick={() => removeFavorite(hotel.id!)}>
                    <FaHeart />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;
