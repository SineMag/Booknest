import styles from "./Filter.module.css";
import Button from "../Button/Button";
import IconButton from "../Iconbutton/Iconbutton";
import { useState } from "react";
import { BsFilter } from "react-icons/bs";
import type { Accomodation } from "../../types/Accomodation";

interface FilterProps {
  data: Accomodation[];
  onFilter: (filtered: Accomodation[]) => void;
}

export default function Filter({ data, onFilter }: FilterProps) {
  const [isToggled, setIsToggled] = useState(false);

  // Dual-handle price range
  const [priceRange, setPriceRange] = useState([200, 2000]);

  const handlePriceChange = (index: number, value: number) => {
    const updated = [...priceRange];
    updated[index] = Number(value);
    // prevent min > max
    if (index === 0 && value > priceRange[1]) updated[0] = priceRange[1];
    if (index === 1 && value < priceRange[0]) updated[1] = priceRange[0];
    setPriceRange(updated);
  };

  // Rating filter
  const [rating, setRating] = useState(0);

  // Sort filter
  const [sortOption, setSortOption] = useState("");

  const closeModal = () => setIsToggled(false);

  const applyFilters = () => {
    // let filtered = data.filter(
    //   (hotel) =>
    //     hotel.price >= priceRange[0] &&
    //     hotel.price <= priceRange[1] &&
    //     hotel.rating >= rating
    // );

    // Sorting
    // if (sortOption === "priceAsc") filtered.sort((a, b) => a.price - b.price);
    // if (sortOption === "priceDesc") filtered.sort((a, b) => b.price - a.price);
    // if (sortOption === "ratingDesc")
    //   filtered.sort((a, b) => b.rating - a.rating);

    // onFilter(filtered); // update parent
    closeModal();
  };

  const clearFilters = () => {
    setPriceRange([200, 2000]);
    setRating(0);
    setSortOption("");
    onFilter(data); // reset to original
    closeModal();
  };

  return (
    <div className={styles.filter}>
      <IconButton icon={BsFilter} onClick={() => setIsToggled(true)} />

      {isToggled && (
        <>
          <div className={styles.backdrop} onClick={closeModal}></div>

          <div className={styles.filterModal}>
            <button className={styles.closeButton} onClick={closeModal}>
              ✕
            </button>

            <h3>Filters</h3>

            {/* Price Slider */}
            <h4>Price Range</h4>
            <div className={styles.sliderGroup}>
              <label>Min: R{priceRange[0]}</label>
              <input
                type="range"
                min="0"
                max="5000"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(0, Number(e.target.value))}
              />

              <label>Max: R{priceRange[1]}</label>
              <input
                type="range"
                min="0"
                max="5000"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(1, Number(e.target.value))}
              />
            </div>

            {/* Rating Stars */}
            <h4>Minimum Rating</h4>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  className={`${styles.star} ${
                    num <= rating ? styles.active : ""
                  }`}
                  onClick={() => setRating(num)}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Sort Dropdown */}
            <h4>Sort By</h4>
            <select
              className={styles.selectDropdown}
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">None</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="ratingDesc">Rating: High to Low</option>
            </select>

            {/* Action Buttons */}
            <div className={styles.filterActions}>
              <Button onClick={applyFilters}>Apply Filters</Button>
              <Button variant="secondary" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
