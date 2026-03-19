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
import { getAllReviews } from "../service/api";
import { fetchHotels, type Hotel } from "../features/InventoryManagementSlice";

const Landing: React.FC = () => {
  const user = useSelector((state: RootState) => state.user?.user || null);
  const { hotels: allHotels, loading: hotelsLoading } = useSelector((state: RootState) => state.hotels);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  /* ------------------------------ SAMPLE DATA ------------------------------ */

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
    const fetchReviews = async () => {
      try {
        setReviewsLoading(true);
        const response = await getAllReviews();
        // Get the latest 3 reviews for the landing page
        const latestReviews = response.data
          .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 3);
        setReviews(latestReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setReviewsLoading(false);
      }
    };

    // Fetch hotels using Redux action (same as UserDashboard)
    dispatch(fetchHotels());

    fetchReviews();
  }, [dispatch]);

  return (
    <div className="landing-wrapper">
      <HeroSection /> {/* LEFT EXACTLY AS YOU SAID */}
      {/* ------------------------------ POPULAR DESTINATIONS ------------------------------ */}
      <section className="luxury-section">
        <h2 className="luxury-title">Popular Destinations</h2>
        <div className="luxury-grid">
          {popularDestinations.map((d, i) => (
            <div 
              key={i} 
              className="lux-card"
              onClick={() => navigate(`/dashboard?location=${d.city.toLowerCase()}`)}
              style={{ cursor: 'pointer' }}
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
                cursor: p.label === "Hotels" ? "pointer" : "default" 
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
              <div key={i} className="lux-hotel-card" style={{ 
                background: '#f5f5f5', 
                borderRadius: '14px',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ textAlign: 'center', color: '#999' }}>
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
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={hotel.imagegallery?.[0] || 'https://via.placeholder.com/300x220'} 
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
            <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
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
        {reviewsLoading ? (
          <div className="lux-testimonial-grid">
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ 
                background: '#f5f5f5', 
                borderRadius: '8px', 
                padding: '20px',
                border: '1px solid #ddd',
                minHeight: '150px'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '10px'
                }}>
                  <div style={{ 
                    width: '100px', 
                    height: '20px', 
                    background: '#e0e0e0', 
                    borderRadius: '4px' 
                  }}></div>
                  <div style={{ 
                    width: '80px', 
                    height: '16px', 
                    background: '#e0e0e0', 
                    borderRadius: '4px' 
                  }}></div>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '60px', 
                  background: '#e0e0e0', 
                  borderRadius: '4px',
                  marginTop: '10px'
                }}></div>
              </div>
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <div className="lux-testimonial-grid">
            {reviews.map((review: any, i: number) => (
              <ReviewCard
                key={review.id || i}
                reviewer={review.reviewer}
                starRatings={review.starRatings}
                reviewText={review.reviewText}
                date={new Date(review.createdAt).toLocaleDateString()}
              />
            ))}
          </div>
        ) : (
          <div className="lux-testimonial-grid">
            <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
              No reviews yet. Be the first to share your experience!
            </p>
          </div>
        )}
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
