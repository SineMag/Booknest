// import React from "react";
import image from "../../images/bed (1).png";

import ProfileMenu from "../ProfileMenu/profileMenu";
import Styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={Styles["navbar-wrapper"]}>
      <nav className={Styles.navbar}>
        {/* Left: Logo image */}
        <div className={Styles["logo-img"]}>
          <img src={image} alt="Logo" />
        </div>

        {/* Center: Navigation Links */}
        <ul className={Styles["nav-links"]}>
          <li>
            <a href="#about">About Us</a>
          </li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
          <li>
            <ProfileMenu isLoggedIn={true} /> {/* pass real login state here */}
          </li>
        </ul>

        {/* Right: Profile Icon */}
        {/* <div className={Styles["profile-icon"]}>👤</div> */}
      </nav>
    </div>
  );
}
