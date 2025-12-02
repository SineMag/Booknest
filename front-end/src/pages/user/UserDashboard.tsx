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
import {
  addToFavorites,
  removeFavorite,
  getFavoriteById,
} from "../../features/favoriteSlice";

const UserDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    hotels: allHotels,
  } = useSelector((state: RootState) => state.hotels);

  const { favorites } = useSelector((state: RootState) => state.favorites);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUserId] = useState<number>(1); // TODO: Get from auth context

  // Filtered list of hotels
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);

  // Initialize filteredHotels once Redux data is loaded
  useEffect(() => {
    setFilteredHotels(allHotels);
  }, [allHotels]);

  // Fetch hotels from API
  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  // Fetch user favorites
  useEffect(() => {
    if (currentUserId) {
      dispatch(getFavoriteById(currentUserId));
    }
  }, [dispatch, currentUserId]);

  // Debug favorites state
  useEffect(() => {
    console.log('Favorites state updated:', favorites);
  }, [favorites]);

  const handleFavoriteToggle = (accommodationId: number) => {
    const isFavorite = favorites.some(fav => fav.accommodationId === accommodationId);
    
    console.log('Toggle favorite:', { accommodationId, isFavorite, currentUserId });
    
    if (isFavorite) {
      dispatch(removeFavorite({ userId: currentUserId, accommodationId }))
        .unwrap()
        .then(() => console.log('Removed from favorites successfully'))
        .catch((error) => console.error('Failed to remove from favorites:', error));
    } else {
      dispatch(addToFavorites({ userId: currentUserId, accommodationId }))
        .unwrap()
        .then(() => console.log('Added to favorites successfully'))
        .catch((error) => console.error('Failed to add to favorites:', error));
    }
  };

  const handleView = (id: number) => {
    navigate(`/accomodation-details/${id}`);
  };

  // Filter by search term
  const displayedHotels = filteredHotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            margin: "0 auto",
            marginBottom: "30px",
          }}
        >
          <SearchBar
            placeholder="Search accommodations..."
            onSearch={setSearchTerm}
          />
          <Filter 
            data={allHotels.map(hotel => ({
              id: hotel.id,
              title: hotel.name,
              price: hotel.price || 0,
              rating: hotel.rating,
              location: hotel.physicaladdress,
              image: hotel.imagegallery?.[0] || "/placeholder-hotel.jpg"
            }))} 
            onFilter={(filtered) => {
              const mappedFiltered = filtered.map(f => allHotels.find(h => h.id === f.id)).filter(Boolean) as Hotel[];
              setFilteredHotels(mappedFiltered);
            }} 
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {displayedHotels.map((acc) => (
            <DashboardCard
              key={acc.id}
              image={acc.imagegallery?.[0] ?? "/placeholder-hotel.jpg"}
              name={acc.name}
              place={acc.physicaladdress}
              description={acc.description}
              price={"N/A"}
              isFavorite={favorites.some(fav => fav.accommodationId === acc.id!)}
              onFavoriteToggle={() => handleFavoriteToggle(acc.id!)}
              onView={() => handleView(acc.id!)}
              rating={acc.rating}
              amenities={acc.amenities}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
