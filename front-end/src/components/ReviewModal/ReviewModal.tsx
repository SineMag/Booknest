import React, { useState } from 'react';
import axios from 'axios';
import Button from '../Button/Button';
import styles from './ReviewModal.module.css';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId?: string | null;
  accommodationId?: number | null;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ 
  isOpen, 
  onClose, 
  bookingId,
  accommodationId 
}) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!review.trim()) {
      setError('Please enter a review');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const reviewData = {
        accommodationId: accommodationId,
        bookingId: bookingId,
        rating: rating,
        reviewText: review,
        reviewDate: new Date().toISOString(),
      };

      // POST review to backend
      const response = await axios.post(
        'https://booknestapi.netlify.app/reviews',
        reviewData
      );

      console.log('Review submitted successfully:', response.data);
      
      // Reset form
      setReview('');
      setRating(5);
      
      // Close modal after successful submission
      onClose();
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.modalTitle}>Leave a Review</h2>
        
        <div className={styles.reviewSection}>
          {/* Rating Section */}
          <div className={styles.ratingSection}>
            <label htmlFor="rating" className={styles.label}>Rating:</label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className={styles.ratingSelect}
            >
              <option value={1}>1 Star - Poor</option>
              <option value={2}>2 Stars - Fair</option>
              <option value={3}>3 Stars - Good</option>
              <option value={4}>4 Stars - Very Good</option>
              <option value={5}>5 Stars - Excellent</option>
            </select>
          </div>

          {/* Review Text Area */}
          <div className={styles.textAreaSection}>
            <label htmlFor="review" className={styles.label}>Your Review:</label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience with this accommodation..."
              className={styles.textarea}
              rows={6}
            />
          </div>

          {/* Error Message */}
          {error && <p className={styles.errorMessage}>{error}</p>}

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit} 
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;