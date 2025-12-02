import React from "react";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import Button from "../Button/Button";
import styles from "./Dashboardcard.module.css";

interface DashboardCardProps {
  image: string;
  name: string;
  place: string;
  description: string;
  amenities: string[];
  price: string;
  rating: number;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onView: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  image,
  name,
  place,
  amenities,
  price,
  rating,
  isFavorite,
  onFavoriteToggle,
  onView,
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <AiFillStar key={i} className={styles.star} />
        ) : (
          <AiOutlineStar key={i} className={styles.star} />
        )
      );
    }
    return <span className={styles.stars}>{stars}</span>;
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} />
        <button className={styles.favoriteButton} onClick={onFavoriteToggle}>
          {isFavorite ? (
            <AiFillHeart className={styles.favoriteIcon} />
          ) : (
            <AiOutlineHeart className={styles.favoriteIcon} />
          )}
        </button>
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>
          {name} {renderStars(rating)}
        </h3>
        <p className={styles.place}>{place}</p>
        <p className={styles.amenities}>Amenities: {amenities.join(", ")}</p>
        <div className={styles.footer}>
          <span className={styles.price}>
            {" "}
            <span className={styles.amount}>R {price}</span> per night
          </span>
          <div className={styles.viewButton}>
            <Button onClick={onView} variant="primary">
              View
            </Button>
          </div>
        </div>
        <div className={styles.topRight}>
          <div className={styles.col6}>
            <div className={styles.column}>
              <span className={styles.reviewStatus}>Very Good</span>
              <span className={styles.numReviews}>12 reviews</span>
            </div>
          </div>
          <div className={styles.col6}>
            <span className={styles.avgRating}>8.4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
