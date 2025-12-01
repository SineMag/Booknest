import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingListItem from "../../components/BookingListItem/BookingListItem";
import styles from "./MyBookings.module.css";
import type { AppDispatch, RootState } from "../../../store";
import { fetchBookinsByUserId } from "../../features/bookingSlice";
import { fetchAccomodations } from "../../features/accomodationSlice";

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
    if (user) {
      dispatch(fetchBookinsByUserId(user.id!));
      dispatch(fetchAccomodations());
    }
  }, [dispatch, user]);

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Returns the name of the accommodation with the given id, or "N/A" if not found.
   * @param {number} accommodationId - The id of the accommodation to find.
   * @returns {string} - The name of the accommodation, or "N/A" if not found.
   */
  /*******  c57ca4db-059e-47f8-b11d-cf1097b16250  *******/ const getAccommodationName =
    (accommodationId: number) => {
      const accommodation = accomodations.find(
        (acc) => acc.id === accommodationId
      );
      return accommodation?.name || "N/A";
    };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

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
        <h2>No Bookings Found!</h2>
      )}
    </div>
  );
};

export default MyBookings;
