import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import {
  fetchHotels,
  type Hotel,
} from "../../features/InventoryManagementSlice";
import { FaEye, FaHeart, FaShare } from "react-icons/fa";
import Button from "../../components/Button/Button";
import { Link } from "react-router";
import {
  getFavouriteByUserId,
  removeFavourite,
} from "../../features/favoriteSlice";

const MyFavorites: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.user);
  const currentUserId = user?.id;

  const { hotels, loading: hotelsLoading } = useSelector(
    (state: RootState) => state.hotels
  );

  const { favorites, loading: favoritesLoading } = useSelector(
    (state: RootState) => state.favorites
  );

  // Load hotels
  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  // Load favorites for current user
  useEffect(() => {
    if (currentUserId) {
      dispatch(getFavouriteByUserId(currentUserId));
    }
  }, [dispatch, currentUserId]);

  // Match hotels with favorites
  const favoriteHotels = hotels
    .map((hotel: Hotel) => {
      const fav = favorites.find(
        (f) => f.accommodationId === hotel.id && f.userId === currentUserId
      );
      if (fav) {
        return {
          ...hotel,
          favouriteId: fav.id, // <-- store the favourite record ID
        };
      }
      return null;
    })
    .filter((hotel) => hotel !== null) as (Hotel & { favouriteId: number })[];

  const removeFavoriteHandler = (favouriteId: number) => {
    dispatch(removeFavourite(favouriteId));
  };

  return (
    <div className="fav-wrapper">
      <div className="fav-container">
        <div className="fav-header">
          <h1>My Favorites</h1>
        </div>

        {hotelsLoading || favoritesLoading ? (
          <div className="fav-loading">Loading...</div>
        ) : favoriteHotels.length === 0 ? (
          <div className="fav-empty">
            <h2>No favorites yet ❤️</h2>
            <p>Start adding accommodations to your favorites!</p>
          </div>
        ) : (
          <div className="fav-grid">
            {favoriteHotels.map((hotel) => (
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

                  {/* FIXED: now passes favouriteId, NOT hotel.id */}
                  <Button
                    onClick={() => removeFavoriteHandler(hotel.favouriteId)}
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
