import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingListItem from "../../components/BookingListItem/BookingListItem";
import styles from "./MyBookings.module.css";
import { fetchBookingsByUser } from "../../features/bookingSlice";
import { fetchAccomodations } from "../../features/accomodationSlice";
import type { AppDispatch, RootState } from "../../../store";
import { FaCalendarPlus, FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import type { User } from "../../types/User";
import { getLocalUser } from "../../utils/LocalStorage";
import LoadingOverlay from "../../components/Loading";

const MyBookings: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    loading: loadingBookings,
    bookings,
    error,
  } = useSelector((state: RootState) => state.booking);
  const { current } = useSelector((state: RootState) => state.user);
  const [user, setUser] = useState<User | null>();

  const { accomodations } = useSelector(
    (state: RootState) => state.accomodation,
  );

  async function getUser() {
    if (current && current.id) {
      setUser(current);
    }
    const user = await getLocalUser();
    if (user && user.id) {
      setUser(user);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(fetchBookingsByUser(user.id!));
      dispatch(fetchAccomodations());
    }
  }, [dispatch, user]);

  console.log(6007, current, { user }, bookings);

  const getAccommodationName = (accommodationId: number) => {
    const accommodation = accomodations.find(
      (acc) => acc.id === accommodationId,
    );
    return accommodation?.name || "N/A";
  };

  if (loadingBookings) {
    return <LoadingOverlay message="Loading..." />;
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
      {bookings.length === 0 && !loadingBookings ? (
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
              // bookingId={booking.id!}
              accommodationName={getAccommodationName(booking.accommodationId)}
              checkIn={new Date(booking.checkInDate).toLocaleDateString()}
              checkOut={new Date(booking.checkOutDate).toLocaleDateString()}
              status={booking.status as "Pending" | "Approved" | "Declined"}
              onCancel={() => console.log("Cancel booking")}
              onEdit={() => console.log("Edit booking")}
              onDelete={() => console.log("Delete booking")}
              onFavorite={() => console.log("Favorite booking")}
              onReview={() => {}}
              isFavorite={false} // Hardcoded for now
              numberOfGuests={booking.numberOfGuests}
              totalPrice={booking.totalPrice}
              specialRequest={booking.specialRequest}
              roomType={booking.roomType}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
