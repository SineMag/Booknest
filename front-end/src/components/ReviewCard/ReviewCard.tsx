import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styles from "./ReviewCard.module.css";

interface ReviewCardProps {
  starRatings: number;
  reviewer: string;
  reviewText: string;
  date: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  starRatings,
  reviewer,
  reviewText,
  date,
}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= starRatings ? (
          <AiFillStar key={i} className={styles.star} />
        ) : (
          <AiOutlineStar key={i} className={styles.star} />
        )
      );
    }
    return stars;
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.stars}>{renderStars()}</div>
        <div className={styles.reviewer}>{reviewer}</div>
        <div className={styles.date}>{date}</div>
      </div>
      <div className={styles.reviewText}>{reviewText}</div>
      <hr />
    </div>
  );
};

export default ReviewCard;
