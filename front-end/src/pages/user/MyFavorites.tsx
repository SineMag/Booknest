import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import DashboardCard from "../../components/Dashboardcard/Dashboardcard";
import type { Hotel } from "../../features/InventoryManagementSlice";
import { useNavigate } from "react-router-dom";

const MyFavorites: React.FC = () => {
  const { favoriteIds } = useSelector((state: RootState) => state.favorites);
  const { hotels } = useSelector((state: RootState) => state.hotels);

  const favoriteHotels = hotels.filter((hotel: Hotel) =>
    favoriteIds.includes(hotel.id)
  );

  const navigate = useNavigate();

  function handleFavoriteToggle(arg0: any): void {
    throw new Error("Function not implemented.");
  }

  const handleView = (id: number) => {
    navigate(`/accomodation-details/${id}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        My Favorites
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {favoriteHotels.length > 0 ? (
          favoriteHotels.map((hotel) => (
            <DashboardCard
              key={hotel.id}
              image={hotel.imagegallery?.[0] ?? "/placeholder-hotel.jpg"}
              name={hotel.name}
              place={hotel.physicaladdress}
              description={hotel.description}
              amenities={hotel.amenities}
              price={hotel.price ? `R${hotel.price}` : "N/A"}
              rating={hotel.rating}
              isFavorite={favoriteIds.includes(hotel.id!)}
              onFavoriteToggle={() => handleFavoriteToggle(hotel.id!)}
              onView={() => handleView(hotel.id!)} // 👈 now works
            />
          ))
        ) : (
          <p>No favorites yet</p>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;
