import React from "react";
import Button from "../Button/Button";
import styles from "./BookingCard.module.css";

interface BookingCardProps {
  bookingId: string;
  userName: string;
  accommodationName: string;
  checkIn: string;
  checkOut: string;
  status: "Pending" | "Approved" | "Declined";
  onApprove: () => void;
  onDecline: () => void;
  onEdit: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  bookingId,
  userName,
  accommodationName,
  checkIn,
  checkOut,
  status,
  onApprove,
  onDecline,
  onEdit,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h3 className={styles.name}>Booking #{bookingId}</h3>
        <p className={styles.detail}>
          <strong>User:</strong> {userName}
        </p>
        <p className={styles.detail}>
          <strong>Accommodation:</strong> {accommodationName}
        </p>
        <p className={styles.detail}>
          <strong>Check-in:</strong> {checkIn}
        </p>
        <p className={styles.detail}>
          <strong>Check-out:</strong> {checkOut}
        </p>
        <p className={styles.detail}>
          <strong>Status:</strong> <span className={`${styles.status} ${styles[status.toLowerCase()]}`}>{status}</span>
        </p>
        <div className={styles.footer}>
          <Button onClick={onApprove} variant="primary">
            Approve
          </Button>
          <Button onClick={onDecline} variant="danger">
            Decline
          </Button>
          <Button onClick={onEdit} variant="secondary">
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;

