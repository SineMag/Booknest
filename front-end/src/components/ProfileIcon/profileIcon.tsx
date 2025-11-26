import type { MouseEventHandler } from "react";
import styles from "./ProfileIcon.module.css";

type ProfileIconProps = {
  onClick?: MouseEventHandler<HTMLSpanElement>;
};

export default function ProfileIcon({ onClick }: ProfileIconProps) {
  return (
    <span className={styles["profile-icon"]} onClick={onClick}>
      {/* Example SVG */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
        <path d="M6 20v-2c0-2.21 3.58-4 8-4s8 1.79 8 4v2" />
      </svg>
    </span>
  );
}
