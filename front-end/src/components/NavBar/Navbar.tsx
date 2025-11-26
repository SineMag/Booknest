import { useState } from "react";
import image from "../../images/bed (1).png";
import NavProfile from "../NavProfile/NavProfile";
import Styles from "./Navbar.module.css";
import Hamburger from "../hamburger/Hamburger"; 
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={Styles["navbar-wrapper"]}>
      <nav className={Styles.navbar}>
        {/* Left: Logo image */}
        <div className={Styles["logo-img"]}>
          <img src={image} alt="Logo" />
        </div>

        {/* Hamburger button for mobile */}
        <div className={Styles.hamburgerContainer}>
          <Hamburger isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
        </div>

        {/* Desktop Navigation Links */}
        <ul className={Styles["nav-links"]}>
          <li>
            <a href="#about">About Us</a>
          </li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
          <li>
            <NavProfile />
          </li>
        </ul>

        {/* Mobile Navigation Menu */}
        <div className={`${Styles.mobileMenu} ${isMobileMenuOpen ? Styles.open : ''}`}>
            <div className={Styles.mobileMenuHeader}>
              <button onClick={toggleMobileMenu} className={Styles.backButton}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              </button>
            </div>
            <ul className={Styles["mobile-nav-links"]}>
              <li>
                <a href="#about" onClick={toggleMobileMenu}>About Us</a>
              </li>
              <li>
                <a href="#contact" onClick={toggleMobileMenu}>Contact Us</a>
              </li>
              <li>
                <NavProfile /> {/* NavProfile might need adjustment for mobile */}
              </li>
            </ul>
          </div>
      </nav>
    </div>
  );
}
