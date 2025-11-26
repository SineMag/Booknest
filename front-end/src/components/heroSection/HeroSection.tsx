import styles from "./HeroSection.module.css";
import image from "../../images/bed.png"; // adjust path
import Button from "../Button/Button";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heroSection}>
        
        {/* LEFT SIDE */}
        <div className={styles.heroLeft}>
          <h1>Welcome to BookNest</h1>
          <p>Search and reserve hotels easily, with the best prices guaranteed.</p>
          <p>Your next hotel stay is just a few clicks away.</p>

           {/* BUTTON (moves only on mobile) */}
        <div className={styles.heroButtons}>
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.heroRight}>
          <img src={image} alt="Hero image" />
        </div>

       

      </div>
    </div>
  );
}