import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

const About: React.FC = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About BookNest</h1>
        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            BookNest was founded with a simple mission: to make finding and
            booking accommodations effortless and enjoyable for travelers across
            South Africa and beyond. We started as a small team of passionate
            travelers who experienced firsthand the challenges of finding the
            perfect place to stay.
          </p>
          <p>
            Today, BookNest connects thousands of travelers with hundreds of
            properties, from luxury resorts to cozy apartments, ensuring every
            journey begins with the perfect nest.
          </p>
        </div>

        <div className="about-section">
          <h2>What We Do</h2>
          <p>
            BookNest is a comprehensive accommodation booking platform that
            offers:
          </p>
          <ul className="about-features">
            <li>Wide selection of hotels, apartments, resorts, and villas</li>
            <li>Real-time availability and pricing</li>
            <li>Secure booking system</li>
            <li>Verified reviews from real guests</li>
            <li>24/7 customer support</li>
            <li>Best price guarantee</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Trust</h3>
              <p>
                We build trust through transparency, verified reviews, and
                secure booking processes.
              </p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>
                We continuously improve our platform to provide the best booking
                experience.
              </p>
            </div>
            <div className="value-card">
              <h3>Service</h3>
              <p>
                We're committed to exceptional service for both travelers and
                property partners.
              </p>
            </div>
            <div className="value-card">
              <h3>Community</h3>
              <p>
                We foster a community of travelers and hosts sharing experiences
                and creating memories.
              </p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Meet the Team</h2>
          <p>
            Our diverse team brings together expertise from hospitality,
            technology, and travel industries. We're united by our passion for
            travel and commitment to making BookNest the best accommodation
            booking platform in South Africa.
          </p>
        </div>

        <div className="about-cta">
          <h2>Join Our Journey</h2>
          <p>
            Whether you're a traveler looking for your next adventure or a
            property owner wanting to reach more guests, BookNest is here to
            help. Join our community and discover the perfect place to call home
            during your travels.
          </p>
          <div className="cta-buttons">
            <Link to="/" className="cta-button primary">
              Start Exploring
            </Link>
            <Link to="/contact-us" className="cta-button secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
