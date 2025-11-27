import React from 'react';
import styles from './AdminDashboard.module.css';
import AdminCard from '../../components/AdminCard/AdminCard';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleInventoryView = () => {
    navigate('/inventory-management');
  };

  const handleReservationView = () => {
    navigate('/reservation-management');
  };

  return (
    <div className={styles.adminDashboardContainer}>
      <h1 className={styles.header}>Admin Dashboard</h1>
      <div className={styles.cardsContainer}>
        <AdminCard
          name="Inventory Management"
          description="Manage accommodations, prices, and availability."
          onView={handleInventoryView}
        />
        <AdminCard
          name="Reservation Management"
          description="Approve, decline, or edit user bookings."
          onView={handleReservationView}
        />
      </div>
      <div className={styles.galleryContainer}>
        <img src="/public/inventory-placeholder.jpg" alt="Inventory" className={styles.galleryImage} />
        <img src="/public/reservation-placeholder.jpg" alt="Reservations" className={styles.galleryImage} />
      </div>
    </div>
  );
}