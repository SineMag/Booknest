import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";
import type { AppDispatch, RootState } from "../../../store";
import {
  fetchHotels,
  type Hotel,
} from "../../features/InventoryManagementSlice";
import { FaEye, FaHeart, FaShare } from "react-icons/fa";
import Button from "../../components/Button/Button";


const MyFavorites: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const { hotels, loading } = useSelector((state: RootState) => state.hotels);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(new Set(JSON.parse(stored)));
  }, []);

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  const favoriteHotels = hotels.filter((hotel: Hotel) =>
    favorites.has(hotel.id)
  );

  const removeFavorite = (id: number) => {
    const newFavs = new Set(favorites);
    newFavs.delete(id);
    setFavorites(newFavs);
    localStorage.setItem("favorites", JSON.stringify([...newFavs]));
  };

  return (
    <div className="fav-wrapper">
      <Navbar />

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
                  <Button className="fav-icon" ><FaEye/></Button>
                  <Button className="fav-icon"><FaShare/></Button>
                  <Button
                    className="fav-icon-heart"
                    onClick={() => removeFavorite(hotel.id)}
                  >
                    <FaHeart/>
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
