import styles from "../Iconbutton/Iconbutton.module.css";
import type { IconType } from "react-icons";

interface Props {
  onClick: () => void;
  icon: IconType;
  isActive?: boolean;
}

export default function IconButton({ icon: Icon, onClick, isActive }: Props) {
  return (
    <button
      onClick={onClick}
      className={`${styles.iconBtn} ${isActive ? styles.active : ""}`}
    >
      <Icon className={styles.icon} />
    </button>
  );
}
