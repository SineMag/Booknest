import React from 'react';
import { FiCalendar, FiEdit, FiUsers, FiCreditCard, FiClipboard, FiInfo, FiTrash2 } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';
import { FiHeart } from 'react-icons/fi';
import styles from './BookingListItem.module.css';

type BookingStatus = "Pending" | "Approved" | "Declined";

interface BookingListItemProps {
  bookingId: string;
  accommodationName: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  onReview: () => void;
  onFavorite: () => void;
  isFavorite: boolean;
  numberOfGuests: number;
  totalPrice?: string | number;
  specialRequest?: string;
  roomType: string;
  onDelete: () => void;
}

const BookingListItem: React.FC<BookingListItemProps> = ({
  bookingId,
  accommodationName,
  checkIn,
  checkOut,
  status,
  onReview,
  onFavorite,
  isFavorite,
  numberOfGuests,
  totalPrice = 0,
  specialRequest,
  roomType,
  onDelete,
}) => {
  const price = typeof totalPrice === 'string' ? parseFloat(totalPrice) : totalPrice;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.accommodationName}>{accommodationName}</h3>
      </div>
      <div className={styles.body}>
        <div className={styles.detailItem}>
          <FiCalendar className={styles.icon} />
          <span>{checkIn} - {checkOut}</span>
        </div>
        <div className={styles.detailItem}>
          <FiUsers className={styles.icon} />
          <span>{numberOfGuests} Guests</span>
        </div>
        <div className={styles.detailItem}>
          <FiCreditCard className={styles.icon} />
          <span>R {price.toFixed(2)}</span>
        </div>
        <div className={styles.detailItem}>
          <FiClipboard className={styles.icon} />
          <span>{roomType}</span>
        </div>
        {specialRequest && (
          <div className={styles.detailItem}>
            <FiInfo className={styles.icon} />
            <span>{specialRequest}</span>
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <div className={styles.actions}>
          <button 
            onClick={onFavorite} 
            className={`${styles.iconButton} ${isFavorite ? styles.favorited : ''}`}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <AiFillHeart className={styles.heartFilled} />
            ) : (
              <FiHeart />
            )}
          </button>
          <button 
            onClick={onReview} 
            className={styles.iconButton}
            title="Write a review"
          >
            <FiEdit />
          </button>
          <button 
            onClick={onDelete} 
            className={`${styles.iconButton} ${styles.deleteButton}`}
            title="Delete booking"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingListItem;
