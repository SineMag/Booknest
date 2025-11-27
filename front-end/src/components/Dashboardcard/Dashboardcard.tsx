import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Button from "../Button/Button";
import styles from "./Dashboardcard.module.css";

interface DashboardCardProps {
  image: string;
  name: string;
  place: string;
  description: string;
  price: string;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onView: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  image,
  name,
  place,
  description,
  price,
  isFavorite,
  onFavoriteToggle,
  onView,
}) => {
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
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.place}>{place}</p>
        <p className={styles.description}>{description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>{price} per month</span>
          <Button onClick={onView} variant="primary">
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
