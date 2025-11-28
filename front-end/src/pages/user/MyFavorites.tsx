import React from "react";
import { useEffect, useState } from "react";
import { getFavorites, toggleFavorite } from "../../service/api";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

type FavoriteHotel = {
  id: number;
  hotelId: number;
  name: string;
  address: string;
  image?: string;
};

export default function MyFavorites() {
  const [favorites, setFavorites] = useState<FavoriteHotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<number | null>(null);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const response = await getFavorites();
      setFavorites(response.data);
    } catch (err) {
      console.error("Failed to load favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const removeFavorite = async (hotelId: number) => {
    try {
      setRemoving(hotelId);
      await toggleFavorite(hotelId, true);

      setFavorites((prev) => prev.filter((fav) => fav.hotelId !== hotelId));
    } catch (err) {
      console.error("Error removing favorite:", err);
    } finally {
      setRemoving(null);
    }
  };

  if (loading) {
    return (
      <p style={{ textAlign: "center", padding: "1rem", fontSize: "1.2rem" }}>
        Loading favorites...
      </p>
    );
  }

  if (favorites.length === 0) {
    return (
      <div
        style={{
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>
          No Favorites Yet
        </h2>
        <p style={{ color: "#555", marginBottom: "1rem" }}>
          Start exploring and save your favorite hotels.
        </p>
        <Link to="/accommodations">
          <Button width={150}>Browse Hotels</Button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>
        My Favorite Hotels
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {favorites.map((fav) => (
          <div
            key={fav.id}
            style={{
              background: "#fff",
              borderRadius: "10px",
              padding: "1rem",
              boxShadow: "0px 3px 10px rgba(0,0,0,0.08)",
              transition: "0.2s ease",
            }}
          >
            {/* IMAGE */}
            <div
              style={{
                height: "160px",
                overflow: "hidden",
                borderRadius: "8px",
                marginBottom: "0.5rem",
              }}
            >
              <img
                src={fav.image || "/placeholder-hotel.jpg"}
                alt={fav.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* TITLE */}
            <h3 style={{ fontSize: "1.2rem", margin: "0.4rem 0" }}>
              {fav.name}
            </h3>

            <p style={{ color: "#666", fontSize: "0.9rem" }}>{fav.address}</p>

            {/* ACTIONS */}
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* VIEW BUTTON */}
              <Link to={`/accommodation/${fav.hotelId}`}>
                <Button width={120}>View</Button>
              </Link>

              {/* REMOVE FAVORITE BUTTON */}
              <button
                onClick={() => removeFavorite(fav.hotelId)}
                disabled={removing === fav.hotelId}
                style={{
                  background: "transparent",
                  border: "1px solid red",
                  padding: "0.4rem 0.7rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  color: "red",
                  transition: "0.2s ease",
                }}
              >
                <FaHeart color="red" />
                {removing === fav.hotelId ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
