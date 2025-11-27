import React, { useState } from 'react';
import BookingListItem from '../../components/BookingListItem/BookingListItem';
import EditBookingModal from '../../components/EditBookingModal/EditBookingModal';
import styles from './ReservationManagement.module.css';
import Button from '../../components/Button/Button';

type BookingStatus = "Pending Approval" | "Approved" | "Declined";

// Mock Data
const mockBookings = [
  {
    bookingId: '101',
    userName: 'John Doe',
    accommodationName: 'Cozy Cottage',
    checkIn: '2025-12-01',
    checkOut: '2025-12-05',
    status: 'Pending Approval' as BookingStatus,
    createdAt: new Date('2025-11-20T10:00:00Z'),
  },
  {
    bookingId: '102',
    userName: 'Jane Smith',
    accommodationName: 'Luxury Villa',
    checkIn: '2026-01-10',
    checkOut: '2026-01-15',
    status: 'Approved' as BookingStatus,
    createdAt: new Date('2025-11-22T14:30:00Z'),
  },
  {
    bookingId: '103',
    userName: 'Peter Jones',
    accommodationName: 'Beach House',
    checkIn: '2026-02-20',
    checkOut: '2026-02-28',
    status: 'Declined' as BookingStatus,
    createdAt: new Date('2025-11-18T09:00:00Z'),
  },
];

export default function ReservationManagement() {
  const [bookings, setBookings] = useState(mockBookings.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<any | null>(null);
  const [filterStatus, setFilterStatus] = useState<BookingStatus | 'All'>('All');

  const handleApprove = (bookingId: string) => {
    console.log(`Approving booking ${bookingId}`);
    setBookings(bookings.map(b => b.bookingId === bookingId ? { ...b, status: 'Approved' } : b));
  };

  const handleDecline = (bookingId: string) => {
    console.log(`Declining booking ${bookingId}`);
    setBookings(bookings.map(b => b.bookingId === bookingId ? { ...b, status: 'Declined' } : b));
  };

  const handleEdit = (booking: any) => {
    console.log(`Editing booking ${booking.bookingId}`);
    setEditingBooking(booking);
    setIsModalOpen(true);
  };

  const handleSave = (updatedBooking: any) => {
    console.log('Saving booking:', updatedBooking);
    setBookings(bookings.map(b => b.bookingId === updatedBooking.bookingId ? updatedBooking : b).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
    setIsModalOpen(false);
    setEditingBooking(null);
  };

  const filteredBookings = filterStatus === 'All'
    ? bookings
    : bookings.filter(b => b.status === filterStatus);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h1 className={styles.header}>Reservation Management</h1>
        <div className={styles.filterContainer}>
          <Button onClick={() => setFilterStatus('All')} variant={filterStatus === 'All' ? 'primary' : 'secondary'}>All</Button>
          <Button onClick={() => setFilterStatus('Pending Approval')} variant={filterStatus === 'Pending Approval' ? 'primary' : 'secondary'}>Pending Approval</Button>
          <Button onClick={() => setFilterStatus('Approved')} variant={filterStatus === 'Approved' ? 'primary' : 'secondary'}>Approved</Button>
          <Button onClick={() => setFilterStatus('Declined')} variant={filterStatus === 'Declined' ? 'primary' : 'secondary'}>Declined</Button>
        </div>
        <div className={styles.listContainer}>
          {filteredBookings.map((booking) => (
            <BookingListItem
              key={booking.bookingId}
              {...booking}
              onApprove={() => handleApprove(booking.bookingId)}
              onDecline={() => handleDecline(booking.bookingId)}
              onEdit={() => handleEdit(booking)}
            />
          ))}
        </div>
      </div>
      <EditBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookingData={editingBooking}
        onSave={handleSave}
      />
    </div>
  );
}
