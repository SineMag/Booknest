import React, { useEffect } from "react";
import styles from "./snackbar.module.css";

interface SnackbarProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

const SnackbarComponent: React.FC<SnackbarProps> = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div className={`${styles.snackbar} ${show ? styles.show : ""}`}>
      {message}
    </div>
  );
};

export default SnackbarComponent;
