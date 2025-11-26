import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileIcon from "../ProfileIcon/profileIcon";
import styles from "./profileMenu.module.css";

type ProfileMenuProps = {
  isLoggedIn: boolean; // pass this from your app state
};

export default function ProfileMenu({ isLoggedIn }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);

  if (!isLoggedIn) return null; // hide completely if not logged in

  return (
    <div className={styles.wrapper}>
      <ProfileIcon onClick={() => setOpen(!open)} />

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
