import { FaWifi } from "react-icons/fa";
import styles from "./Tag.module.css";

export default function FreeWifiButton() {
  return (
    <a className={styles["free-wifi-btn"]}>
      <FaWifi />
      <span>Free Wifi</span>
    </a>
  );
}
