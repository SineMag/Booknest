import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";
import SearchBar from "../../components/Searchbar/Searchbar";
import DashboardCard from "../../components/Dashboardcard/Dashboardcard";
import type { AppDispatch, RootState } from "../../../store";
import { fetchHotels, type Hotel } from "../../features/InventoryManagementSlice";
import Filter from "../../components/Filter/Filter";


const UserDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const { hotels, loading, error } = useSelector(
    (state: RootState) => state.hotels
  );

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  const handleFavoriteToggle = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const handleView = (id: number) => {
    navigate(`/accomodation-details/${id}`);
  };

  // Filter hotels based on search query
  const filteredHotels = hotels.filter((h: { name: string; }) =>
    h.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />
      <div
        style={{
          flex: 1,
          padding: "20px",
          maxWidth: "1200px",
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
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          <SearchBar
            placeholder="Search accommodations..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />
          <Filter/>
        </div>

        {loading && <p>Loading accommodations…</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {filteredHotels.map((acc: Hotel) => (
            <DashboardCard
              key={acc.id}
              image={acc.imagegallery?.[0] ?? "/placeholder-hotel.jpg"}
              name={acc.name}
              place={acc.physicaladdress}
              description={acc.description}
              price={acc.price ? `R${acc.price}` : "N/A"} // use price from backend
              isFavorite={favorites.has(acc.id)}
              onFavoriteToggle={() => handleFavoriteToggle(acc.id)}
              onView={() => handleView(acc.id)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
