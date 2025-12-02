import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import {
  fetchHotels,
  type Hotel,
} from "../../features/InventoryManagementSlice";
import {
  removeFavorite,
  getFavoriteById,
} from "../../features/favoriteSlice";
import { FaEye, FaHeart, FaShare } from "react-icons/fa";
import Button from "../../components/Button/Button";
import { Link } from "react-router";

const MyFavorites: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const currentUserId = user?.id;

  const { hotels, loading } = useSelector((state: RootState) => state.hotels);
  const { favorites, loading: favoritesLoading } = useSelector((state: RootState) => state.favorites);

  // Debug logging
  useEffect(() => {
    console.log('User data:', user);
    console.log('Current user ID:', currentUserId);
    console.log('All favorites:', favorites);
  }, [user, currentUserId, favorites]);

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  useEffect(() => {
    if (currentUserId) {
      dispatch(getFavoriteById(currentUserId));
    }
  }, [dispatch, currentUserId]);

  const favoriteHotels = hotels.filter((hotel: Hotel) =>
    favorites.some(fav => fav.accommodationId === hotel.id && fav.userId === currentUserId)
  );

  const removeFavoriteHandler = (accommodationId: number) => {
    if (currentUserId) {
      dispatch(removeFavorite({ userId: currentUserId, accommodationId }));
    }
  };

  return (
    <div className="fav-wrapper">

      <div className="fav-container">
        <div className="fav-header">
          <h1>My Favorites</h1>
        </div>

        {loading || favoritesLoading ? (
          <div className="fav-loading">Loading...</div>
        ) : favoriteHotels.length === 0 ? (
          <div className="fav-empty">
            <h2>No favorites yet ❤️</h2>
            <p>Start adding accommodations to your favorites!</p>
          </div>
        ) : (
          <div className="fav-grid">
            {favoriteHotels.map((hotel: Hotel) => (
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
                    <Button className="fav-icon">
                      <FaEye />
                    </Button>
                  </Link>

                  <Button className="fav-icon">
                    <FaShare />
                  </Button>
                  <Button
                    className="fav-icon-heart"
                    onClick={() => removeFavoriteHandler(hotel.id)}
                  >
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
