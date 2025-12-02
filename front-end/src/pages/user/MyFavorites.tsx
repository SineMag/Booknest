import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import DashboardCard from "../../components/Dashboardcard/Dashboardcard";
import { Hotel } from "../../features/InventoryManagementSlice";

const MyFavorites: React.FC = () => {
  const { favoriteIds } = useSelector((state: RootState) => state.favorites);
  const { hotels } = useSelector((state: RootState) => state.hotels);

  const favoriteHotels = hotels.filter((hotel: Hotel) =>
    favoriteIds.includes(hotel.id)
  );

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
              isFavorite={true}
              onFavoriteToggle={() => {}}
              onView={() => {}}
            />
          ))
        ) : (
          <p>You have no favorite hotels yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;