import { useState, useEffect } from "react";
import styles from "./snackbar.module.css"; // CSS Modules

function App() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setOpen(false), 3000); // auto-close
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleClick = () => {
    setOpen(true); // Show snackbar on click
  };

  return (
    <div className={styles.app}>
      <button className={styles.showBtn} onClick={handleClick}>
        Show Snackbar
      </button>

      <div className={`${styles.snackbar} ${open ? styles.show : ""}`}>
        Your profile has been updated!
      </div>
    </div>
  );
}

export default App;
