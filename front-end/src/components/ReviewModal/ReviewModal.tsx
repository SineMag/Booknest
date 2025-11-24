import React, { useState } from 'react';
import Navbar from '../NavBar/Navbar';
import Footer from '../footer/Footer';
import Button from '../Button/Button';
import styles from './ReviewModal.module.css';

const ReviewModal: React.FC = () => {
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    // Handle submit logic here, e.g., send to backend
    console.log('Review submitted:', review);
    // Optionally close modal or show success message
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <Navbar />
        <div className={styles.reviewSection}>
          <Button onClick={handleSubmit} type="button">
            Submit Review
          </Button>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here"
            className={styles.textarea}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ReviewModal;