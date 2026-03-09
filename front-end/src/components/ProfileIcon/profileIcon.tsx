import { FaUserCircle } from "react-icons/fa";
import type { MouseEventHandler } from "react";
import styles from "./ProfileIcon.module.css";

type ProfileIconProps = {
  onClick?: MouseEventHandler<HTMLSpanElement>;
};

export default function ProfileIcon({ onClick }: ProfileIconProps) {
  return (
    <span className={styles["profile-icon"]} onClick={onClick}>
      <FaUserCircle size={26} />
    </span>
  );
}
