import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingListItem from "../../components/BookingListItem/BookingListItem";
import styles from "./MyBookings.module.css";
import { fetchBookingsByUser } from "../../features/bookingSlice";
import { fetchAccomodations } from "../../features/accomodationSlice";
import type { AppDispatch, RootState } from "../../../store";
import { FaCalendarPlus, FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

const MyBookings: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { bookings, loading, error } = useSelector(
    (state: RootState) => state.booking
  );
  const { user } = useSelector((state: RootState) => state.user);
  console.log("User object from Redux store:", user);
  const { accomodations } = useSelector(
    (state: RootState) => state.accomodation
  );

  useEffect(() => {
    if (user) {
      dispatch(fetchBookingsByUser(user.id!));
      dispatch(fetchAccomodations());
    }
  }, [dispatch, user]);

  const getAccommodationName = (accommodationId: number) => {
    const accommodation = accomodations.find(
      (acc) => acc.id === accommodationId
    );
    return accommodation?.name || "N/A";
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return (
      <div className={styles.errorContainer}>
        <FaExclamationTriangle className={styles.errorIcon} />
        <p className={styles.errorText}>
          {error || "An unknown error occurred."}
        </p>
        <Button
          onClick={() => {
            if (user) {
              dispatch(fetchBookingsByUser(user.id!));
              dispatch(fetchAccomodations());
            }
          }}
          variant="danger"
        >
          Retry
        </Button>
      </div>
    );
  }

  console.log("Bookings from Redux store:", bookings);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Bookings</h1>
      {bookings.length === 0 ? (
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
          {bookings.map((booking) => (
            <BookingListItem
              key={booking.id}
              bookingId={booking.id!}
              accommodationName={getAccommodationName(booking.accommodationid)}
              checkIn={new Date(booking.checkindate).toLocaleDateString()}
              checkOut={new Date(booking.checkoutdate).toLocaleDateString()}
              status={booking.status as "Pending" | "Approved" | "Declined"}
              onCancel={() => console.log("Cancel booking")}
              onEdit={() => console.log("Edit booking")}
              onDelete={() => console.log("Delete booking")}
              onFavorite={() => console.log("Favorite booking")}
              onReview={() => {}}
              isFavorite={false} // Hardcoded for now
              numberOfGuests={booking.numberofguests}
              totalPrice={booking.totalprice}
              specialRequest={booking.specialrequest}
              roomType={booking.roomType}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
