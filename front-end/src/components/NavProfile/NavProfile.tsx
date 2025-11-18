import type { MouseEventHandler } from "react";
import styles from "./NavProfile.module.css";

type ProfileIconProps = {
  onClick?: MouseEventHandler<HTMLSpanElement>;
};

export default function ProfileIcon({ onClick }: ProfileIconProps) {
  return (
    <span className={styles["profile-icon"]} onClick={onClick}>
      {/* White SVG icon */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
      </svg>
    </span>
  );
}
