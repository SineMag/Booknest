import styles from "./Filter.module.css";
import Button from "../Button/Button";
import IconButton from "../Iconbutton/Iconbutton";
import { useState } from "react";
import { BsFilter } from "react-icons/bs";


export default function Filter() {
const [isToggled, setIsToggled] = useState(false);


// Price slider state
const [priceRange, setPriceRange] = useState([200, 2000]);


const handlePriceChange = (index: number, value: number) => {
const updated = [...priceRange];
updated[index] = Number(value);
setPriceRange(updated);
};


// Rating stars
const [rating, setRating] = useState(0);


// Sort dropdown
const [sortOption, setSortOption] = useState("");


const closeModal = () => setIsToggled(false);


return (
<div className={styles.filter}>
{/* Filter Icon */}
<IconButton icon={BsFilter} onClick={() => setIsToggled(true)} />


{/* Modal + Backdrop */}
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
 className={`${styles.star} ${num <= rating ? styles.active : ""}`}
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
 <Button onClick={() => console.log("Apply Filters")}>Apply Filters</Button>
 <Button variant="secondary" onClick={() => console.log("Clear Filters")}>Clear Filters</Button>
 </div>
 </div>
 </>
 )}
 </div>);
}