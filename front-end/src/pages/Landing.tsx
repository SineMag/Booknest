import React, { useState, useEffect } from "react";
import {
  FaWifi,
  FaSwimmingPool,
  FaUtensils,
  FaParking,
  FaSpa,
  FaConciergeBell,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import HeroSection from "../components/heroSection/HeroSection";
import SnackbarComponent from "../components/Snackbar/snackbar";
import Button from "../components/Button/Button";
import ReviewModal from "../components/ReviewModal/ReviewModal";
import ReviewCard from "../components/ReviewCard/ReviewCard";
import { useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { fetchAccomodations } from "../features/accomodationSlice";

const Landing: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user?.user || null);
  const { accomodations } = useSelector((state: RootState) => state.accomodation);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    if (accomodations.length === 0) {
      dispatch(fetchAccomodations());
    }
  }, [dispatch, accomodations.length]);

  // Get featured hotels from real accommodations (top 3 by rating or first 3)
  const featuredHotels = accomodations
    .slice(0, 3)
    .map((acc) => ({
      id: acc.id,
      image: Array.isArray(acc.imagegallery) && acc.imagegallery.length > 0
        ? acc.imagegallery[0]
        : "/placeholder.jpg",
      title: acc.name,
      location: acc.physicaladdress || "Location TBD",
      price: acc.pricepernight ? `R${acc.pricepernight}` : "Price TBD",
      rating: acc.rating || 0,
    }));

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

  const testimonials = [
    { name: "John D.", stay: "Deluxe Room", comment: "Amazing stay!" },
    { name: "Sarah M.", stay: "Family Suite", comment: "Perfect family trip!" },
    {
      name: "Michael T.",
      stay: "Business Suite",
      comment: "Fast WiFi + quiet.",
    },
  ];

  /* ------------------------------ EFFECTS ------------------------------ */

  useEffect(() => {
    if (!user) setShowSnackbar(true);
  }, [user]);

  return (
    <div className="landing-wrapper">
      <HeroSection /> {/* LEFT EXACTLY AS YOU SAID */}
      {/* ------------------------------ POPULAR DESTINATIONS ------------------------------ */}
      <section className="luxury-section">
        <h2 className="luxury-title">Popular Destinations</h2>
        <div className="luxury-grid">
          {popularDestinations.map((d, i) => (
            <div key={i} className="lux-card">
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
            <div key={i} className="lux-card">
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
        <div className="lux-hotel-grid">
          {featuredHotels.length > 0 ? (
            featuredHotels.map((hotel) => (
              <div
                className="lux-hotel-card"
                key={hotel.id}
                onClick={() => navigate(`/accomodation-details/${hotel.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img src={hotel.image} alt={hotel.title} />
                <div className="lux-hotel-info">
                  <h3>{hotel.title}</h3>
                  <p>{hotel.location}</p>
                  <p className="price">{hotel.price} / night</p>
                  <p className="rating">⭐ {hotel.rating.toFixed(1)}</p>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", gridColumn: "1 / -1" }}>
              Loading featured accommodations...
            </p>
          )}
        </div>
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
          {testimonials.map((t, i) => (
            <ReviewCard
              key={i}
              reviewer={t.name}
              starRatings={5}
              comment={t.comment}
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
    </div>
  );
};

export default Landing;
