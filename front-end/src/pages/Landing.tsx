import React, { useState, useEffect } from "react";
import {
  FaWifi,
  FaSwimmingPool,
  FaUtensils,
  FaParking,
  FaSpa,
  FaConciergeBell,
} from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import HeroSection from "../components/heroSection/HeroSection";
import Navbar from "../components/NavBar/Navbar";
import Footer from "../components/footer/Footer";
import SnackbarComponent from "../components/Snackbar/snackbar";
import Button from "../components/Button/Button";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import ReviewCard from "../components/ReviewCard/ReviewCard";
import ReviewModal from "../components/ReviewModal/ReviewModal";
import styled from "styled-components";
// import styles from "./Landing.module.css";
import { Link } from "react-router-dom";

const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.2rem;
  color: #2c3e50;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 80px;
    height: 4px;
    background: #e67e22;
    margin: 0.5rem auto 0;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const HotelCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .hotel-info {
    padding: 1.5rem;
    text-align: left;
  }

  .hotel-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
  }

  .hotel-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0;
    color: #2c3e50;
  }

  .hotel-price {
    font-size: 1.2rem;
    font-weight: 700;
    color: #e67e22;
  }

  .hotel-location {
    color: #7f8c8d;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .hotel-rating {
    display: inline-flex;
    align-items: center;
    background: #f1c40f;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    margin-top: 0.5rem;
  }

  .hotel-description {
    color: #7f8c8d;
    font-size: 0.9rem;
    margin-top: 0.8rem;
    line-height: 1.5;
  }
`;

const Testimonials = styled.div`
  background: #f9f9f9;
  padding: 4rem 2rem;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const SpecialOffers = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80");
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 6rem 2rem;
  margin: 4rem 0;
`;

const OfferCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 10px;
  max-width: 600px;
  margin: 0 auto;
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ContactCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    font-size: 1.5rem;
    color: #e67e22;
  }
`;

const Landing: React.FC = () => {
  const userData = useSelector((state: RootState) => state.user);
  const user = userData ? userData.user : null;
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 2)),
      key: "selection",
    },
  ]);

  const recommendedHotels = [
    {
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      title: "Luxury Beach Resort",
      location: "Durban, KwaZulu-Natal",
      price: "R4299",
      rating: 4.8,
      description:
        "Experience ultimate luxury with ocean views, private beach access, and world-class amenities.",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo-fplMdzubdT3s_1rVfc7m-qT0xhVq67VBg&s",
      title: "Mountain View Lodge",
      location: "Cape Town, Western Cape",
      price: "R3249",
      rating: 4.7,
      description:
        "Nestled in the heart of the mountains, perfect for nature lovers and adventure seekers.",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW9O7VQ1XL8XGSMqMAUdQ7iy3eS1iqMtPnlw&s",
      title: "Urban Oasis Hotel",
      location: "Sandton, Pretoria",
      price: "R5349",
      rating: 4.9,
      description:
        "Modern luxury in the heart of the city, steps away from major attractions and business centers.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      title: "Toti",
      location: "Durban, KwaZulu-Natal",
      price: "R2349",
      rating: 4.9,
      description:
        "Modern luxury in the heart of the city, steps away from major attractions and business centers.",
    },
  ];

  const MainContent = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  width: 100%;
`;

  const testimonials = [
    {
      name: "John D.",
      stay: "Deluxe Room",
      comment:
        "Amazing experience! The staff was incredibly helpful and the room was spotless.",
    },
    {
      name: "Sarah M.",
      stay: "Family Suite",
      comment:
        "Perfect for our family vacation. Kids loved the pool and the central location was great.",
    },
    {
      name: "Michael T.",
      stay: "Business Suite",
      comment: "Great amenities and fast WiFi. Perfect for business travelers.",
    },
  ];

  useEffect(() => {
    if (!user) {
      setShowSnackbar(true);
    }
  }, [user]);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleOpenReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  return (
    <div>

  <Navbar />
  
      <HeroSection />

      {/* Features Section */}
      <Section>
        <SectionTitle>Recommended Hotels</SectionTitle>
        <FeaturesGrid>
          {recommendedHotels.map((hotel, index) => (
            <HotelCard key={index}>
              <img src={hotel.image} alt={hotel.title} />
              <div className="hotel-info">
                <div className="hotel-header">
                  <h3 className="hotel-title">{hotel.title}</h3>
                  <div className="hotel-price">
                    {hotel.price}
                    <span style={{ fontSize: "0.9rem", fontWeight: "normal" }}>
                      /night
                    </span>
                  </div>
                </div>
                <div className="hotel-location">
                  <MdLocationOn size={16} />
                  {hotel.location}
                </div>
                <div className="hotel-rating">★ {hotel.rating}</div>
                <p className="hotel-description">{hotel.description}</p>
              </div>
            </HotelCard>
          ))}
        </FeaturesGrid>
      </Section>

      {/* Special Offers */}
      <SpecialOffers>
        <OfferCard>
          <h2>Special Summer Offer</h2>
          <p>
            Book a stay of 3 nights or more and get 20% off your entire stay!
          </p>
          <p>
            Use code: <strong>SUMMER20</strong>
          </p>
          <Link to="/login">
            <Button style={{ marginTop: "1rem" }}>Book Now</Button>
          </Link>
        </OfferCard>
      </SpecialOffers>

      {/* Testimonials */}
      <Testimonials>
        <Section>
          <SectionTitle>What Our Guests Say</SectionTitle>
          <TestimonialGrid>
            {testimonials.map((testimonial, index) => (
              <ReviewCard
                key={index}
                reviewer={testimonial.name}
                starRatings={5}
                reviewText={testimonial.comment}
                date={new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              />
            ))}
          </TestimonialGrid>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Button onClick={handleOpenReviewModal}>Write a Review</Button>
          </div>
        </Section>
      </Testimonials>

      {/* Contact Information */}
      <Section>
        <SectionTitle>Contact Us</SectionTitle>
        <ContactInfo>
          <ContactCard>
            <MdLocationOn />
            <div>
              <h3>Location</h3>
              <p>123 Luxury Street, City Center, 10001</p>
            </div>
          </ContactCard>
          <ContactCard>
            <MdEmail />
            <div>
              <h3>Email</h3>
              <p>info@booknest.com</p>
            </div>
          </ContactCard>
          <ContactCard>
            <MdPhone />
            <div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
          </ContactCard>
        </ContactInfo>
      </Section>

      <SnackbarComponent
        message="Register or log in first"
        show={showSnackbar}
        onClose={handleCloseSnackbar}
      />

      <Footer />
    </div>
  );
};

export default Landing;
