import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileIcon from "../NavProfile/NavProfile";
import styles from "../ProfileMenu/profileMenu.module.css";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      {/* Profile Icon */}
      <ProfileIcon onClick={() => setOpen(!open)} />

      {/* Dropdown Menu */}
      {open && (
        <div className={styles.menu}>
          <Link to="/">HOME</Link>
          <Link to="/profile">PROFILE</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/contact">CONTACT US</Link>
          <Link to="/bookings">MY BOOKINGS</Link>
          <Link to="/favorites">MY FAVORITES</Link>
          <button className={styles.logoutBtn}>LOGOUT</button>
        </div>
      )}
    </div>
  );
}
