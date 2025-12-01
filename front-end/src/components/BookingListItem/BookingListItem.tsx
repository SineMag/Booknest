import React from 'react';
import { FaHeart, FaRegHeart, FaPencilAlt, FaTrash } from 'react-icons/fa';
import Button from '../Button/Button';
import IconButton from '../Iconbutton/Iconbutton';
import styles from './BookingListItem.module.css';

type BookingStatus = "Pending" | "Approved" | "Declined";

interface BookingListItemProps {
  bookingId: string;
  userName: string;
  accommodationName: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  createdAt: Date;
  onCancel: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onFavorite: () => void;
  isFavorite: boolean;
}

const BookingListItem: React.FC<BookingListItemProps> = ({
  bookingId,
  userName,
  accommodationName,
  checkIn,
  checkOut,
  status,
  createdAt,
  onCancel,
  onEdit,
  onDelete,
  onFavorite,
  isFavorite,
}) => {
  const statusClass = status.toLowerCase().replace(' ', '-');
  return (
    <div className={styles.item}>
      <div className={styles.info}>
        <div className={styles.details}>
          <h3 className={styles.name}>Booking #{bookingId}</h3>
          <p className={styles.detail}><strong>User:</strong> {userName}</p>
          <p className={styles.detail}><strong>Accommodation:</strong> {accommodationName}</p>
          <p className={styles.detail}><strong>Check-in:</strong> {checkIn}</p>
          <p className={styles.detail}><strong>Check-out:</strong> {checkOut}</p>
          <p className={styles.detail}><strong>Booked on:</strong> {createdAt.toLocaleDateString()}</p>
        </div>
        <div className={styles.statusContainer}>
          <span className={`${styles.status} ${styles[statusClass]}`}>{status}</span>
        </div>
      </div>
      <div className={styles.actions}>
        {status === 'Approved' && <Button onClick={onCancel} variant="danger">Cancel</Button>}
        <div className={styles.iconActions}>
          <IconButton icon={isFavorite ? FaHeart : FaRegHeart} onClick={onFavorite} isActive={isFavorite} />
          <IconButton icon={FaPencilAlt} onClick={onEdit} />
          <IconButton icon={FaTrash} onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default BookingListItem;
