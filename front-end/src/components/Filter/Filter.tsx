import styles from "./Filter.module.css";
import Button from "../Button/Button";
import IconButton from "../Iconbutton/Iconbutton";
import { useState } from "react";
import { BsFilter } from "react-icons/bs";

export default function Filter() {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className={styles.filter}>
      <IconButton icon={BsFilter} onClick={() => setIsToggled(!isToggled)} />

      {isToggled && (
        <div className={styles.filterModal}>
          <button
            className={styles.closeButton}
            onClick={() => setIsToggled(!isToggled)}
          >
            X
          </button>
          <h4>Filter By</h4>
          <Button>Price: Low to High</Button>
          <Button>Price: High to Low</Button>
          <Button>Ratings</Button>
        </div>
      )}
    </div>
  );
}
