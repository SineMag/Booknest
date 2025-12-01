import React from 'react';
import Button from '../Button/Button';
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
        <Button onClick={onEdit} variant="secondary">Edit</Button>
      </div>
    </div>
  );
};

export default BookingListItem;
