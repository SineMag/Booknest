import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../../components/Searchbar/Searchbar";
import Filter from "../../components/Filter/Filter";
import DashboardCard from "../../components/Dashboardcard/Dashboardcard";
import type { AppDispatch, RootState } from "../../../store";
import {
  fetchHotels,
  type Hotel,
} from "../../features/InventoryManagementSlice";

const UserDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    hotels: allHotels,
    loading,
    error,
  } = useSelector((state: RootState) => state.hotels);

  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered list of hotels
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);

  // Initialize filteredHotels once Redux data is loaded
  useEffect(() => {
    setFilteredHotels(allHotels);
  }, [allHotels]);

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(new Set(JSON.parse(stored)));
  }, []);

  // Save favorites
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify([...favorites]));
  }, [favorites]);

  // Fetch hotels from API
  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  const handleFavoriteToggle = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) newFavorites.delete(id);
      else newFavorites.add(id);
      return newFavorites;
    });

    navigate("/my-favorites");
  };

  const handleView = (id: number) => {
    navigate(`/accomodation-details/${id}`);
  };

  // Filter by search term (location)
  const displayedHotels = filteredHotels.filter((hotel) =>
    hotel.physicaladdress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          padding: "20px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "2.5rem",
            color: "#333",
          }}
        >
          Available Accommodations
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "baseline",
            gap: "10px",
            marginBottom: "30px",
            marginLeft: "50px",
            flexWrap: "wrap",
          }}
        >
          <SearchBar
            placeholder="Search by location..."
            onSearch={setSearchTerm}
          />
          <Filter data={allHotels} onFilter={setFilteredHotels} />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {displayedHotels.map((acc, index) => (
            <DashboardCard
              key={acc.id}
              image={acc.imagegallery?.[0] ?? "/placeholder-hotel.jpg"}
              name={acc.name}
              place={acc.physicaladdress}
              description={acc.description}
              amenities={acc.amenities}
              price={`R${[100, 80, 50][index] ?? acc.price ?? "N/A"}`}
              rating={acc.rating}
              isFavorite={favorites.has(acc.id)}
              onFavoriteToggle={() => handleFavoriteToggle(acc.id)}
              onView={() => handleView(acc.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
