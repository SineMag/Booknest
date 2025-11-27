import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/footer/Footer";
import SearchBar from "../../components/Searchbar/Searchbar";
import DashboardCard from "../../components/Dashboardcard/Dashboardcard";

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const accommodations = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      name: "Luxury Beach Resort",
      place: "Durban, KwaZulu-Natal",
      description: "Experience ultimate luxury with ocean views, private beach access, and world-class amenities.",
      price: "R4299",
    },
    {
      id: 2,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo-fplMdzubdT3s_1rVfc7m-qT0xhVq67VBg&s",
      name: "Mountain View Lodge",
      place: "Cape Town, Western Cape",
      description: "Nestled in the heart of the mountains, perfect for nature lovers and adventure seekers.",
      price: "R3249",
    },
    {
      id: 3,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW9O7VQ1XL8XGSMqMAUdQ7iy3eS1iqMtPnlw&s",
      name: "Urban Oasis Hotel",
      place: "Sandton, Pretoria",
      description: "Modern luxury in the heart of the city, steps away from major attractions and business centers.",
      price: "R5349",
    },
  ];

  const handleFavoriteToggle = (id: number) => {
    setFavorites(prev => {
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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "30px", fontSize: "2.5rem", color: "#333" }}>Available Accommodations</h1>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
          <SearchBar placeholder="Search accommodations..." />
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
          {accommodations.map(acc => (
            <DashboardCard
              key={acc.id}
              image={acc.image}
              name={acc.name}
              place={acc.place}
              description={acc.description}
              price={acc.price}
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
