import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingListItem from "../../components/BookingListItem/BookingListItem";
import styles from "./MyBookings.module.css";
import { fetchBookingsByUser } from "../../features/bookingSlice";
import { fetchAccomodations } from "../../features/accomodationSlice";
import type { AppDispatch, RootState } from "../../../store";
import {
  FaCalendarPlus,
  FaExclamationTriangle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

const MyBookings: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { bookings, status, error } = useSelector(
    (state: RootState) => state.booking
  );
  const { user } = useSelector((state: RootState) => state.user);
  console.log("User object from Redux store:", user);
  const { accomodations } = useSelector(
    (state: RootState) => state.accomodation
  );

  useEffect(() => {
    if (user) {
      dispatch(fetchBookinsByUserId(user.id!));
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
              dispatch(fetchBookingsByUser(user.id));
              dispatch(fetchAccomodations());
            }
          }}
          variant="danger"
          className={styles.retryButton}
        >
          Retry
        </Button>
      </div>
    );
  }

  console.log("Bookings from Redux store:", bookings);
  return (
    <div className={styles.container}>
      {bookings ? (
        <>
          <h1 className={styles.title}>My Bookings</h1>
          {bookings.length === 0 ? (
            <p>You have no bookings yet.</p>
          ) : (
            <div className={styles.bookingList}>
              {bookings.map((booking) => (
                <BookingListItem
                  key={booking.id}
                  bookingId={booking.id!}
                  userName={user?.firstName || "N/A"}
                  accommodationName={getAccommodationName(
                    booking.accommodationId
                  )}
                  checkIn={new Date(booking.checkInDate).toLocaleDateString()}
                  checkOut={new Date(booking.checkOutDate).toLocaleDateString()}
                  status={booking.status as "Pending" | "Approved" | "Declined"}
                  createdAt={new Date()}
                  onCancel={() => console.log("Cancel booking")}
                  onEdit={() => console.log("Edit booking")}
                  onDelete={() => console.log("Delete booking")}
                  onFavorite={() => console.log("Favorite booking")}
                  isFavorite={false} // Hardcoded for now
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className={styles.bookingList}>
          {bookings.map((booking) => (
            <BookingListItem
              key={booking.id}
              bookingId={booking.id!}
              userName={`${user?.firstName} ${user?.lastName}` || "N/A"}
              accommodationName={getAccommodationName(booking.accommodationId)}
              checkIn={new Date(booking.checkInDate).toLocaleDateString()}
              checkOut={new Date(booking.checkOutDate).toLocaleDateString()}
              status={booking.status as "Pending" | "Approved" | "Declined"}
              createdAt={new Date(booking.createdAt!)}
              onCancel={() => console.log("Cancel booking")}
              onEdit={() => console.log("Edit booking")}
              onDelete={() => console.log("Delete booking")}
              onFavorite={() => console.log("Favorite booking")}
              isFavorite={false} // Hardcoded for now
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;