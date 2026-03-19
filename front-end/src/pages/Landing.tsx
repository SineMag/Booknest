import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaWifi,
  FaSwimmingPool,
  FaUtensils,
  FaParking,
  FaSpa,
  FaConciergeBell,
} from "react-icons/fa";

import HeroSection from "../components/heroSection/HeroSection";
import SnackbarComponent from "../components/Snackbar/snackbar";
import ReviewModal from "../components/ReviewModal/ReviewModal";
import ReviewCard from "../components/ReviewCard/ReviewCard";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { fetchHotels, type Hotel } from "../features/InventoryManagementSlice";
import Navbar from "../components/NavBar/Navbar";
import Footer from "../components/footer/Footer";

const Landing: React.FC = () => {
  const { current: user } = useSelector((state: RootState) => state.user);
  const { hotels: allHotels, loading: hotelsLoading } = useSelector(
    (state: RootState) => state.hotels,
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  /* ------------------------------ SAMPLE DATA ------------------------------ */

  const testimonials = [
    {
      id: 1,
      reviewer: "Sarah Johnson",
      starRatings: 5,
      reviewText:
        "Amazing experience! The hotel was clean, staff was friendly, and the location was perfect. Will definitely book again!",
      date: "2025-03-15",
    },
    {
      id: 2,
      reviewer: "Michael Chen",
      starRatings: 4,
      reviewText:
        "Great value for money. The room was spacious and comfortable. Only minor issue was the breakfast service, but overall excellent stay.",
      date: "2025-03-10",
    },
    {
      id: 3,
      reviewer: "Amanda Smith",
      starRatings: 5,
      reviewText:
        "Absolutely loved our stay! The view from our room was breathtaking and the amenities were top-notch. Highly recommend!",
      date: "2025-03-08",
    },
  ];

  const propertyTypes = [
    {
      label: "Hotels",
      img: "https://media-cdn.tripadvisor.com/media/photo-s/2c/21/66/38/main-exterior.jpg",
    },
    {
      label: "Apartments",
      img: "https://media.equityapartments.com/images/c_crop,x_0,y_0,w_1920,h_1080/c_fill,w_1920,h_1080/q_auto,f_auto/4295-228/lyle-apartments-exterior",
    },
    {
      label: "Resorts",
      img: "https://media-cdn.tripadvisor.com/media/photo-s/30/9d/e2/a6/caption.jpg",
    },
    {
      label: "Villas",
      img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/562018261.jpg?k=6b29082e9d250c0bc93cad9143eed2cb514fdbdd449e6b0bef36fa2fac7152c1&o=",
    },
  ];

  const popularDestinations = [
    {
      city: "Durban",
      img: "https://media-cdn.tripadvisor.com/media/photo-s/2c/21/66/38/main-exterior.jpg",
    },
    {
      city: "Cape Town",
      img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/ca/8d/e4/mountain-view.jpg?w=900&h=500&s=1",
    },
    {
      city: "Sandton",
      img: "https://ik.imgkit.net/3vlqs5axxjf/external/http://images.ntmllc.com/v4/hotel/T39/T39353/T39353_EXT_Z84491.jpg?tr=w-1200%2Cfo-auto",
    },
  ];

  /* ------------------------------ EFFECTS ------------------------------ */

  useEffect(() => {
    if (!user) setShowSnackbar(true);
  }, [user]);

  useEffect(() => {
    // Fetch hotels using Redux action (same as UserDashboard)
    dispatch(fetchHotels());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <HeroSection /> {/* LEFT EXACTLY AS YOU SAID */}
      {/* ------------------------------ POPULAR DESTINATIONS ------------------------------ */}
      <section className="luxury-section">
        <h2 className="luxury-title">Popular Destinations</h2>
        <div className="luxury-grid">
          {popularDestinations.map((d, i) => (
            <div
              key={i}
              className="lux-card"
              onClick={() =>
                navigate(`/dashboard?location=${d.city.toLowerCase()}`)
              }
              style={{ cursor: "pointer" }}
            >
              <img src={d.img} alt={d.city} />
              <div className="lux-card-overlay">
                <h3>{d.city}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ------------------------------ PROPERTY TYPES ------------------------------ */}
      <section className="luxury-section">
        <h2 className="luxury-title">Browse by Property Type</h2>
        <div className="luxury-grid">
          {propertyTypes.map((p, i) => (
            <div
              key={i}
              className="lux-card"
              onClick={() => {
                if (p.label === "Hotels") {
                  navigate("/dashboard");
                }
              }}
              style={{
                cursor: p.label === "Hotels" ? "pointer" : "default",
              }}
            >
              <img src={p.img} alt={p.label} />
              <div className="lux-card-overlay">
                <h3>{p.label}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ------------------------------ FEATURED HOTELS ------------------------------ */}
      <section className="luxury-section">
        <h2 className="luxury-title">Featured Hotels</h2>
        {hotelsLoading ? (
          <div className="lux-hotel-grid">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="lux-hotel-card"
                style={{
                  background: "#f5f5f5",
                  borderRadius: "14px",
                  height: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ textAlign: "center", color: "#999" }}>
                  Loading...
                </div>
              </div>
            ))}
          </div>
        ) : allHotels.length > 0 ? (
          <div className="lux-hotel-grid">
            {allHotels.slice(0, 3).map((hotel: Hotel, index: number) => (
              <div
                className="lux-hotel-card"
                key={hotel.id || index}
                onClick={() => navigate(`/accomodation-details/${hotel.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={
                    hotel.imagegallery?.[0] ||
                    "https://via.placeholder.com/300x220"
                  }
                  alt={hotel.name}
                />
                <div className="lux-hotel-info">
                  <h3>{hotel.name}</h3>
                  <p>{hotel.physicaladdress}</p>
                  <p className="price">R{hotel.pricepernight} / night</p>
                  <p className="rating">⭐ {hotel.rating}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="lux-hotel-grid">
            <p style={{ textAlign: "center", gridColumn: "1 / -1" }}>
              No accommodations available yet.
            </p>
          </div>
        )}
      </section>
      {/* ------------------------------ AMENITIES ------------------------------ */}
      <section className="luxury-section">
        <h2 className="luxury-title">Amenities You’ll Love</h2>
        <div className="lux-amenities-grid">
          {[
            { icon: <FaWifi />, label: "High-Speed Wi-Fi" },
            { icon: <FaSwimmingPool />, label: "Swimming Pool" },
            { icon: <FaUtensils />, label: "Fine Dining" },
            { icon: <FaParking />, label: "Secure Parking" },
            { icon: <FaSpa />, label: "Spa & Wellness" },
            { icon: <FaConciergeBell />, label: "24/7 Concierge" },
          ].map((a, i) => (
            <div key={i} className="lux-amenity">
              <div className="icon">{a.icon}</div>
              <p>{a.label}</p>
            </div>
          ))}
        </div>
      </section>
      {/* ------------------------------ TESTIMONIALS ------------------------------ */}
      <section className="luxury-section">
        <h2 className="luxury-title">What Guests Say</h2>
        <div className="lux-testimonial-grid">
          {testimonials.map((testimonial, i) => (
            <ReviewCard
              key={testimonial.id || i}
              reviewer={testimonial.reviewer}
              starRatings={testimonial.starRatings}
              reviewText={testimonial.reviewText}
              date={new Date(testimonial.date).toLocaleDateString()}
            />
          ))}
        </div>
      </section>
      {/* Snackbar & Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
      <SnackbarComponent
        message="Register or log in first"
        show={showSnackbar}
        onClose={() => setShowSnackbar(false)}
      />
      <Footer />
    </>
  );
};

export default Landing;
