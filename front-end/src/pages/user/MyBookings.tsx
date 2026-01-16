import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BookingListItem from "../../components/BookingListItem/BookingListItem";
import ReviewModal from "../../components/ReviewModal/ReviewModal";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import SnackbarComponent from "../../components/Snackbar/snackbar";
import styles from "./MyBookings.module.css";
import { fetchAccomodations } from "../../features/accomodationSlice";
import type { AppDispatch, RootState } from "../../../store";
import {
  FaCalendarPlus,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

// Fake booking data for testing until the backend is fully functional
const FAKE_BOOKINGS = [
  {
    id: "1",
    checkindate: "2025-12-10",
    checkoutdate: "2025-12-15",
    numberofguests: 2,
    totalprice: 750,
    specialrequest: "Early check-in preferred",
    status: "Approved",
    userid: 44,
    accommodationid: 1,
    roomtypeid: 2,
  },
  {
    id: "2",
    checkindate: "2025-12-20",
    checkoutdate: "2025-12-25",
    numberofguests: 4,
    totalprice: 1200,
    specialrequest: "High floor room",
    status: "Pending",
    userid: 44,
    accommodationid: 2,
    roomtypeid: 3,
  },
  {
    id: "3",
    checkindate: "2025-12-05",
    checkoutdate: "2025-12-08",
    numberofguests: 1,
    totalprice: 300,
    specialrequest: "",
    status: "Approved",
    userid: 44,
    accommodationid: 3,
    roomtypeid: 1,
  },
];

const MyBookings: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { accomodations } = useSelector(
    (state: RootState) => state.accomodation
  );

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [selectedAccommodationId, setSelectedAccommodationId] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ message: string; show: boolean }>({
    message: "",
    show: false,
  });

  useEffect(() => {
    dispatch(fetchAccomodations());
  }, [dispatch]);

  const getAccommodationName = (accommodationId: number) => {
    const accommodation = accomodations.find(
      (acc) => acc.id === accommodationId
    );
    return accommodation?.name || "N/A";
  };

  const handleReviewClick = (bookingId: string, accommodationId: number) => {
    setSelectedBookingId(bookingId);
    setSelectedAccommodationId(accommodationId);
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
    setSelectedBookingId(null);
    setSelectedAccommodationId(null);
  };

  const handleFavoriteClick = async (bookingId: string, accommodationId: number) => {
    const isFavorited = favorites.has(bookingId);

    try {
      if (isFavorited) {
        // Remove from favorites
        await axios.delete(
          `https://booknestapi.netlify.app/favorites/${accommodationId}`
        );
        favorites.delete(bookingId);
        setSnackbar({
          message: "Removed from favorites",
          show: true,
        });
      } else {
        // Add to favorites
        await axios.post(
          `https://booknestapi.netlify.app/favorites`,
          { hotelId: accommodationId }
        );
        favorites.add(bookingId);
        setSnackbar({
          message: "Added to favorites",
          show: true,
        });
      }
      // Update state to trigger re-render
      setFavorites(new Set(favorites));
    } catch (err) {
      console.error("Error updating favorites:", err);
      setSnackbar({
        message: "Failed to update favorites. Please try again.",
        show: true,
      });
    }
  };

  const handleDeleteClick = (bookingId: string) => {
    setBookingToDelete(bookingId);
    setIsDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!bookingToDelete) return;

    try {
      // Call backend to delete booking
      await axios.delete(
        `https://booknestapi.netlify.app/bookings/${bookingToDelete}`
      );

      // Remove from FAKE_BOOKINGS (in real scenario, would update Redux state)
      const index = FAKE_BOOKINGS.findIndex(b => b.id === bookingToDelete);
      if (index > -1) {
        FAKE_BOOKINGS.splice(index, 1);
      }

      setSnackbar({
        message: "Booking deleted successfully",
        show: true,
      });
    } catch (err) {
      console.error("Error deleting booking:", err);
      setSnackbar({
        message: "Failed to delete booking. Please try again.",
        show: true,
      });
    } finally {
      setIsDeleteConfirmOpen(false);
      setBookingToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setBookingToDelete(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Bookings</h1>
      {FAKE_BOOKINGS.length === 0 ? (
        <div className={styles.noBookings}>
          <FaCalendarPlus className={styles.noBookingsIcon} />
          <p className={styles.noBookingsText}>You have no bookings yet.</p>
          <Link to="/dashboard" className={styles.noBookingsButton}>
            <Button variant="primary">Book Now</Button>
          </Link>
        </div>
      ) : (
        <div className={styles.bookingList}>
          <h2>Bookings</h2>
          {FAKE_BOOKINGS.map((booking) => (
            <BookingListItem
              key={booking.id}
              bookingId={booking.id!}
              accommodationName={getAccommodationName(booking.accommodationid)}
              checkIn={new Date(booking.checkindate).toLocaleDateString()}
              checkOut={new Date(booking.checkoutdate).toLocaleDateString()}
              status={booking.status as "Pending" | "Approved" | "Declined"}
              onReview={() => handleReviewClick(booking.id, booking.accommodationid)}
              onFavorite={() => handleFavoriteClick(booking.id, booking.accommodationid)}
              onDelete={() => handleDeleteClick(booking.id)}
              isFavorite={favorites.has(booking.id)}
              numberOfGuests={booking.numberofguests}
              totalPrice={booking.totalprice}
              specialRequest={booking.specialrequest}
              roomType={booking.roomtypeid === 1 ? "Standard" : booking.roomtypeid === 2 ? "Deluxe" : "Suite"}
            />
          ))}
        </div>
      )}

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReviewModal}
        bookingId={selectedBookingId}
        accommodationId={selectedAccommodationId}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteConfirmOpen}
        title="Delete Booking"
        message="Are you sure you want to delete this booking? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmButtonLabel="Delete"
        cancelButtonLabel="Cancel"
      />

      {/* Snackbar Notification */}
      <SnackbarComponent
        message={snackbar.message}
        show={snackbar.show}
        onClose={() => setSnackbar({ ...snackbar, show: false })}
      />
    </div>
  );
};

export default MyBookings;