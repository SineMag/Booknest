import { useState, useRef, useEffect } from "react";
import image from "../../images/bed (1).png";
import NavProfile from "../NavProfile/NavProfile";
import Styles from "./Navbar.module.css";
import Hamburger from "../hamburger/Hamburger";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerContainerRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        hamburgerContainerRef.current &&
        !hamburgerContainerRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isMobileMenuOpen]);

  return (
    <div className={Styles["navbar-wrapper"]}>
      <nav className={Styles.navbar}>
        {/* Left: Clickable Logo */}
        <div className={Styles["logo-img"]}>
          <Link to="/">
            <img src={image} alt="Logo" />
          </Link>
        </div>

        {/* Hamburger button for mobile */}
        <div className={Styles.hamburgerContainer} ref={hamburgerContainerRef}>
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

        {/* Mobile Menu Backdrop */}
        {isMobileMenuOpen && (
          <div className={Styles.backdrop} onClick={closeMobileMenu} />
        )}

        {/* Mobile Navigation Menu */}
        <div
          ref={mobileMenuRef}
          className={`${Styles.mobileMenu} ${
            isMobileMenuOpen ? Styles.open : ""
          }`}
        >
          <div className={Styles.mobileMenuHeader}>
            <button onClick={closeMobileMenu} className={Styles.backButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <ul className={Styles["mobile-nav-links"]}>
            <li>
              <a href="#about" onClick={closeMobileMenu}>
                About Us
              </a>
            </li>
            <li>
              <a href="#contact" onClick={closeMobileMenu}>
                Contact Us
              </a>
            </li>
            <li onClick={closeMobileMenu}>
              <NavProfile />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
