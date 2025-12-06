import { useEffect, useRef } from "react";
import styles from "./HeroSection.module.css";
import image from "../../images/bed.png";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  const heroLeftRef = useRef<HTMLDivElement>(null);
  const heroRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade in text and floating animation for the bed image
    if (heroLeftRef.current && heroRightRef.current) {
      heroLeftRef.current.style.opacity = '1';
      heroLeftRef.current.style.transform = 'translateY(0)';
      
      heroRightRef.current.style.opacity = '1';
      heroRightRef.current.style.transform = 'translateY(0) rotate(0deg)';
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.heroSection}>
        {/* LEFT SIDE */}
        <div
          ref={heroLeftRef}
          className={`${styles.heroLeft} ${styles.fadeIn}`}
        >
          <h1>Welcome to BookNest</h1>
          <p>Book the finest hotels at the best rates, effortlessly.</p>
          <p>
            From luxury resorts to cozy boutique stays, we have options for
            every traveler.
          </p>
          <p>Your next unforgettable getaway is just a few clicks away.</p>

          {/* BUTTON */}
          <div className={styles.heroButtons}>
            <Button onClick={() => navigate("/register")}>Get Started</Button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          ref={heroRightRef}
          className={`${styles.heroRight} ${styles.floatAnimation}`}
        >
          <img src={image} alt="Comfortable hotel bed" />
        </div>
      </div>
    </div>
  );
}