import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../../../store";
import ProfileMenu from "../ProfileMenu/profileMenu";
import styles from "./NavProfile.module.css";

export default function NavProfile() {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return (
    <span className={styles["profile-icon"]}>
      {isLoggedIn ? (
        <ProfileMenu isLoggedIn={isLoggedIn} />
      ) : (
        <>
          {/* White SVG icon */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
          </svg>
          <div className={styles["dropdown-content"]}>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </>
      )}
      
    <span className={styles["profile-icon"]} onClick={onclick}>
      {/* White SVG icon */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
      </svg>

      {/* Dropdown Menu */}
      <div className={styles["dropdown-content"]}>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/adminRegister">Login as Admin</Link> {/* <-- Added */}
      </div>
    </span>
    </span>
  );
}
