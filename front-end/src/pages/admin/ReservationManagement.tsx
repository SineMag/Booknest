import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import BookingListItem from '../../components/BookingListItem/BookingListItem';
import EditBookingModal from '../../components/EditBookingModal/EditBookingModal';
import styles from './ReservationManagement.module.css';
import Button from '../../components/Button/Button';
import { fetchAccomodations } from '../../features/accomodationSlice';
import { updateBooking, deleteBooking } from '../../features/bookingSlice';
import type { AppDispatch, RootState } from '../../../store';
import { FaExclamationTriangle } from 'react-icons/fa';

type BookingStatus = "Pending" | "Approved" | "Declined" | "Booked";

interface BookingWithUserInfo {
  bookingId: string;
  userName: string;
  userEmail: string;
  accommodationName: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  createdAt: Date;
  numberOfGuests?: number;
  totalPrice?: number;
  specialRequest?: string;
  roomType?: string;
}

const API_BASE = "https://booknestapi.netlify.app";

export default function ReservationManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const { accomodations } = useSelector((state: RootState) => state.accomodation);
  const [bookings, setBookings] = useState<BookingWithUserInfo[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<BookingWithUserInfo | null>(null);
  const [filterStatus, setFilterStatus] = useState<BookingStatus | 'All'>('All');

  useEffect(() => {
    dispatch(fetchAccomodations());
    const initializeData = async () => {
      await loadUsers();
      await loadBookings();
    };
    initializeData();
  }, [dispatch, accomodations.length]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/bookings`);
      const bookingsData = Array.isArray(response.data) ? response.data : [];
      
      // Map bookings with user and accommodation info
      const mappedBookings: BookingWithUserInfo[] = bookingsData.map((booking: any) => {
        const user = users.find(u => u.id === booking.userid || u.id === booking.userId);
        const accommodation = accomodations.find(
          acc => acc.id === booking.accommodationid || acc.id === booking.accommodationId
        );
        
        return {
          bookingId: String(booking.id),
          userName: user ? `${user.firstname || ''} ${user.lastname || ''}`.trim() || user.emailaddress : 'Unknown User',
          userEmail: user?.emailaddress || 'N/A',
          accommodationName: accommodation?.name || 'Unknown Accommodation',
          checkIn: booking.checkindate || booking.checkInDate,
          checkOut: booking.checkoutdate || booking.checkOutDate,
          status: (booking.status || 'Pending') as BookingStatus,
          createdAt: new Date(booking.createdat || booking.createdAt || Date.now()),
          numberOfGuests: booking.numberofguests || booking.numberOfGuests,
          totalPrice: booking.totalprice || booking.totalPrice,
          specialRequest: booking.specialrequest || booking.specialRequest,
          roomType: booking.roomtype || booking.roomType,
        };
      });
      
      setBookings(mappedBookings.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
      setError(null);
    } catch (err: any) {
      console.error('Error loading bookings:', err);
      setError(err.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE}/users`);
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Error loading users:', err);
    }
  };

  const handleCancel = async (bookingId: string) => {
    try {
      const booking = bookings.find(b => b.bookingId === bookingId);
      if (booking) {
        await dispatch(updateBooking({
          id: bookingId,
          userId: 0, // Will be updated from booking data
          accommodationId: 0,
          checkInDate: new Date(booking.checkIn),
          checkOutDate: new Date(booking.checkOut),
          numberOfGuests: booking.numberOfGuests || 0,
          totalPrice: booking.totalPrice || 0,
          status: 'Declined',
          roomType: booking.roomType || '',
        })).unwrap();
        await loadBookings();
      }
    } catch (err: any) {
      console.error('Error cancelling booking:', err);
      setError(err.message || 'Failed to cancel booking');
    }
  };

  const handleDelete = async (bookingId: string) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    
    try {
      await dispatch(deleteBooking(Number(bookingId))).unwrap();
      await loadBookings();
    } catch (err: any) {
      console.error('Error deleting booking:', err);
      setError(err.message || 'Failed to delete booking');
    }
  };

  const handleEdit = (booking: BookingWithUserInfo) => {
    setEditingBooking(booking);
    setIsEditModalOpen(true);
  };

  const handleSave = async (updatedBooking: BookingWithUserInfo) => {
    try {
      const originalBooking = bookings.find(b => b.bookingId === updatedBooking.bookingId);
      if (originalBooking) {
        await dispatch(updateBooking({
          id: updatedBooking.bookingId,
          userId: 0,
          accommodationId: 0,
          checkInDate: new Date(updatedBooking.checkIn),
          checkOutDate: new Date(updatedBooking.checkOut),
          numberOfGuests: updatedBooking.numberOfGuests || 0,
          totalPrice: updatedBooking.totalPrice || 0,
          status: updatedBooking.status,
          roomType: updatedBooking.roomType || '',
        })).unwrap();
        await loadBookings();
      }
      setIsEditModalOpen(false);
      setEditingBooking(null);
    } catch (err: any) {
      console.error('Error updating booking:', err);
      setError(err.message || 'Failed to update booking');
    }
  };

  const filteredBookings = filterStatus === 'All'
    ? bookings
    : bookings.filter(b => b.status === filterStatus);

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          <p>Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <FaExclamationTriangle style={{ fontSize: '2rem', color: 'red' }} />
            <p style={{ color: 'red' }}>{error}</p>
            <Button onClick={loadBookings} variant="primary">Retry</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className={styles.header}>Reservation Management</h1>
          <Button onClick={loadBookings} variant="secondary">Refresh</Button>
        </div>
        <div className={styles.filterContainer}>
          <Button onClick={() => setFilterStatus('All')} variant={filterStatus === 'All' ? 'primary' : 'secondary'}>All</Button>
          <Button onClick={() => setFilterStatus('Pending')} variant={filterStatus === 'Pending' ? 'primary' : 'secondary'}>Pending</Button>
          <Button onClick={() => setFilterStatus('Approved')} variant={filterStatus === 'Approved' ? 'primary' : 'secondary'}>Approved</Button>
          <Button onClick={() => setFilterStatus('Booked')} variant={filterStatus === 'Booked' ? 'primary' : 'secondary'}>Booked</Button>
          <Button onClick={() => setFilterStatus('Declined')} variant={filterStatus === 'Declined' ? 'primary' : 'secondary'}>Declined</Button>
        </div>
        <div className={styles.listContainer}>
          {filteredBookings.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '2rem' }}>No bookings found</p>
          ) : (
            filteredBookings.map((booking) => (
              <BookingListItem
                key={booking.bookingId}
                bookingId={booking.bookingId}
                accommodationName={booking.accommodationName}
                checkIn={new Date(booking.checkIn).toLocaleDateString()}
                checkOut={new Date(booking.checkOut).toLocaleDateString()}
                status={booking.status as "Pending" | "Approved" | "Declined"}
                onCancel={() => handleCancel(booking.bookingId)}
                onEdit={() => handleEdit(booking)}
                onDelete={() => handleDelete(booking.bookingId)}
                onFavorite={() => {}}
                onReview={() => {}}
                isFavorite={false}
                numberOfGuests={booking.numberOfGuests || 0}
                totalPrice={booking.totalPrice || 0}
                specialRequest={booking.specialRequest}
                roomType={booking.roomType || 'Standard'}
              />
            ))
          )}
        </div>
      </div>
      <EditBookingModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingBooking(null);
        }}
        bookingData={editingBooking}
        onSave={handleSave}
      />
    </div>
  );
}
