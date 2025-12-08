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
  const { accomodations } = useSelector(
    (state: RootState) => state.accomodation
  );

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchBookingsByUser(user.id));
      dispatch(fetchAccomodations());
    }
  }, [dispatch, user]);

  const getAccommodationName = (accommodationId: number) => {
    const accommodation = accomodations.find(
      (acc) => acc.id === accommodationId
    );
    return accommodation?.name || "N/A";
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>My Bookings</h1>
        <p>Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <FaExclamationTriangle className={styles.errorIcon} />
        <p className={styles.errorText}>
          {error || "An unknown error occurred."}
        </p>
        <Button
          onClick={() => {
            if (user && user.id) {
              dispatch(fetchBookingsByUser(user.id));
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
          {bookings.map((booking: any) => {
            // Handle both snake_case (from backend) and camelCase formats
            const accommodationId = booking.accommodationid || booking.accommodationId;
            const checkInDate = booking.checkindate || booking.checkInDate;
            const checkOutDate = booking.checkoutdate || booking.checkOutDate;
            const numberOfGuests = booking.numberofguests || booking.numberOfGuests;
            const totalPrice = booking.totalprice || booking.totalPrice;
            const specialRequest = booking.specialrequest || booking.specialRequest;
            const roomType = booking.roomtype || booking.roomType || "Standard";
            const bookingId = booking.id?.toString() || "";
            
            return (
              <BookingListItem
                key={booking.id}
                bookingId={bookingId}
                accommodationName={getAccommodationName(accommodationId)}
                checkIn={new Date(checkInDate).toLocaleDateString()}
                checkOut={new Date(checkOutDate).toLocaleDateString()}
                status={(booking.status || "Pending") as "Pending" | "Approved" | "Declined"}
                onCancel={() => console.log("Cancel booking")}
                onEdit={() => console.log("Edit booking")}
                onDelete={() => console.log("Delete booking")}
                onFavorite={() => console.log("Favorite booking")}
                onReview={() => {}}
                isFavorite={false}
                numberOfGuests={numberOfGuests}
                totalPrice={totalPrice}
                specialRequest={specialRequest}
                roomType={roomType}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
