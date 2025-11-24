import React, { useState } from 'react';
import Button from '../Button/Button';
import styles from './ReviewModal.module.css';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    // Handle submit logic here, e.g., send to backend
    console.log('Review submitted:', review);
    // Close modal after submit
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.reviewSection}>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here"
            className={styles.textarea}
          />
          <Button onClick={handleSubmit} type="button">
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;