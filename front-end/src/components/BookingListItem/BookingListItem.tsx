import React from 'react';
import { FiCalendar, FiEdit, FiTrash2, FiHeart, FiXCircle, FiUsers, FiCreditCard, FiClipboard, FiInfo } from 'react-icons/fi';
import styles from './BookingListItem.module.css';

type BookingStatus = "Pending" | "Approved" | "Declined";

interface BookingListItemProps {
  bookingId: string;
  accommodationName: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  onCancel: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onFavorite: () => void;
  isFavorite: boolean;
  numberOfGuests: number;
  totalPrice?: number;
  specialRequest?: string;
  roomType: string;
}

const BookingListItem: React.FC<BookingListItemProps> = ({
  bookingId,
  accommodationName,
  checkIn,
  checkOut,
  status,
  onCancel,
  onEdit,
  onDelete,
  onFavorite,
  isFavorite,
  numberOfGuests,
  totalPrice = 0,
  specialRequest,
  roomType,
}) => {
  const statusClass = styles[status.toLowerCase()];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.accommodationName}>{accommodationName}</h3>
        <span className={`${styles.status} ${statusClass}`}>{status}</span>
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
          <span>R {totalPrice.toFixed(2)}</span>
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
          {status === 'Approved' && (
            <button onClick={onCancel} className={`${styles.iconButton} ${styles.cancelButton}`}>
              <FiXCircle />
            </button>
          )}
          <button onClick={onFavorite} className={styles.iconButton}>
            <FiHeart style={{ fill: isFavorite ? 'red' : 'none', stroke: 'red' }} />
          </button>
          <button onClick={onEdit} className={styles.iconButton}>
            <FiEdit />
          </button>
          <button onClick={onDelete} className={styles.iconButton}>
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingListItem;
