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
  addToFavourites,
  getFavouriteByUserId,
  removeFavourite,
} from "../../features/favoriteSlice";

const UserDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.user);
  const currentUserId = user?.id;

  const { hotels: allHotels } = useSelector((state: RootState) => state.hotels);

  const { favorites } = useSelector((state: RootState) => state.favorites);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);

  // Sync filtered list with hotel list
  useEffect(() => {
    setFilteredHotels(allHotels);
  }, [allHotels]);

  // Load hotels
  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  // Load favorites for logged user
  useEffect(() => {
    if (currentUserId) {
      dispatch(getFavouriteByUserId(currentUserId));
    }
  }, [dispatch, currentUserId]);

  // Attach favouriteId + isFavorite to each hotel
  const hotelsWithFavoriteInfo = filteredHotels.map((hotel) => {
    const fav: any = favorites.find(
      (f) => f.accommodationid === hotel.id && f.userid === currentUserId
    );

    return {
      ...hotel,
      isFavorite: !!fav,
      favouriteId: fav?.id || null,
    };
  });

  // Toggle favourite
  const handleFavoriteToggle = (
    hotel: Hotel & { favouriteId: number | null }
  ) => {
    if (!currentUserId) {
      alert("Please log in to add favorites");
      return;
    }

    if (hotel.favouriteId) {
      // REMOVE
      dispatch(removeFavourite(hotel.favouriteId));
    } else {
      // ADD
      dispatch(
        addToFavourites({
          userid: currentUserId,
          accommodationid: hotel.id,
        })
      );
    }
  };

  const handleView = (id: number) => {
    navigate(`/accomodation-details/${id}`);
  };

  // SEARCH
  const displayedHotels = hotelsWithFavoriteInfo.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <div style={{ flex: 1, padding: "20px", margin: "0 auto" }}>
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
            marginBottom: "30px",
          }}
        >
          <SearchBar
            placeholder="Search accommodations..."
            onSearch={setSearchTerm}
          />

          <Filter
            data={allHotels.map((hotel) => ({
              id: hotel.id,
              title: hotel.name,
              price: hotel.price || 0,
              rating: hotel.rating,
              location: hotel.physicaladdress,
              image: hotel.imagegallery?.[0] || "/placeholder-hotel.jpg",
            }))}
            onFilter={(filtered) => {
              const mappedFiltered = filtered
                .map((f) => allHotels.find((h) => h.id === f.id))
                .filter(Boolean) as Hotel[];
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
              amenities={acc.amenities}
              rating={acc.rating}
              isFavorite={acc.isFavorite}
              onFavoriteToggle={() => handleFavoriteToggle(acc)}
              onView={() => handleView(acc.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
