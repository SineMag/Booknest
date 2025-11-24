import type { IconType } from "react-icons";
import styles from "./Tag.module.css";

interface Props {
  text: string;
  icon?: IconType; // make it optional if you want text-only tags
}

export default function Tag({ text, icon: Icon }: Props) {
  return (
    <a className={styles.tag}>
      {Icon && <Icon className={styles.icon} size={20} />}
      <span>{text}</span>
    </a>
  );
}
