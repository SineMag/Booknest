import type { MouseEventHandler } from "react";
import styles from "./NavProfile.module.css";
import { Link, useNavigate } from "react-router-dom";
import { removeLocalUser } from "../../utils/LocalStorage";

type ProfileIconProps = {
  onClick?: MouseEventHandler<HTMLSpanElement>;
};

export default function ProfileIcon({ onClick }: ProfileIconProps) {
  const navigate = useNavigate();
  return (
    <span className={styles["profile-icon"]} onClick={onClick}>
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
        <Link style={{ backgroundColor: "gray" }} to="/login">
          Login
        </Link>
        <Link style={{ backgroundColor: "gray" }} to="/register">
          Register
        </Link>
        <Link style={{ backgroundColor: "gray" }} to="/adminRegister">
          Login as Admin
        </Link>{" "}
        <button
          style={{ backgroundColor: "gray" }}
          onClick={() => {
            removeLocalUser();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </span>
  );
}
