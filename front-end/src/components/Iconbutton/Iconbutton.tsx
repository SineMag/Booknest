import styles from "../Iconbutton/Iconbutton.module.css";
import type { IconType } from "react-icons";

interface Props {
  onClick(): void;
  icon: IconType;
}

export default function IconButton({ icon: Icon, onClick }: Props) {
  return (
    <button className={styles.iconButton}>
      {Icon && (
        <Icon
          className={styles.icon}
          size={30}
          color="black"
          onClick={() => onClick}
        />
      )}
    </button>
  );
}
