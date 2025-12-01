import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../../components/Searchbar/Searchbar";
import Filter from "../../components/Filter/Filter";
import DashboardCard from "../../components/Dashboardcard/Dashboardcard";
import type { AppDispatch, RootState } from "../../../store";
import { fetchAccomodations } from "../../features/accomodationSlice";
import type { Accomodation } from "../../types/Accomodation";

const UserDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  const { accomodations, loading, error } = useSelector(
    (state: RootState) => state.accomodation
  );

  // Load favorites from localStorage when page loads
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(new Set(JSON.parse(stored)));
    }
  }, []);

  // Save favorites to localStorage anytime the Set changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify([...favorites]));
  }, [favorites]);

  useEffect(() => {
    dispatch(fetchAccomodations());
  }, [dispatch]);

  const filteredAccommodations = accomodations.filter((acc: Accomodation) =>
    acc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

    // Redirect to My Favorites page
    navigate("/my-favorites");
  };

  const handleView = (id: number) => {
    navigate(`/accomodation-details/${id}`);
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
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
            alignItems: "baseline",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <SearchBar
            placeholder="Search accommodations..."
            onSearch={setSearchTerm}
          />
          <Filter />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {filteredAccommodations.map((acc) => (
            <DashboardCard
              key={acc.id}
              image={acc.imagegallery?.[0] ?? "/placeholder-hotel.jpg"}
              name={acc.name}
              place={acc.physicaladdress}
              description={acc.description}
              price={"N/A"} // use price from backend
              isFavorite={favorites.has(acc.id!)}
              onFavoriteToggle={() => handleFavoriteToggle(acc.id!)}
              onView={() => handleView(acc.id!)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
