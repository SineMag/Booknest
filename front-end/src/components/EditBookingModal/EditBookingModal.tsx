import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import styles from "./EditBookingModal.module.css";

type BookingStatus = "Pending Approval" | "Approved" | "Declined";

const mockAccommodations = [
  "Cozy Cottage",
  "Luxury Villa",
  "Beach House",
  "Mountain Cabin",
  "City Apartment",
];

interface BookingData {
  bookingId: string;
  userName: string;
  accommodationName: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
}

interface EditBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: BookingData | null;
  onSave: (updatedData: BookingData) => void;
}

const EditBookingModal: React.FC<EditBookingModalProps> = ({
  isOpen,
  onClose,
  bookingData,
  onSave,
}) => {
  const [formData, setFormData] = useState<BookingData | null>(null);

  useEffect(() => {
    setFormData(bookingData);
  }, [bookingData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = () => {
    if (formData) {
      onSave(formData);
    }
  };

  if (!isOpen || !formData) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>Edit Booking #{formData.bookingId}</h2>
        <div className={styles.form}>
          <label>
            User Name:
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
          </label>
          <label>
            Accommodation Name:
            <select
              name="accommodationName"
              value={formData.accommodationName}
              onChange={handleChange}
            >
              {mockAccommodations.map((acc) => (
                <option key={acc} value={acc}>
                  {acc}
                </option>
              ))}
            </select>
          </label>
          <label>
            Check-in Date:
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
            />
          </label>
          <label>
            Check-out Date:
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
            />
          </label>
          <label>
            Status:
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Pending Approval">Pending Approval</option>
              <option value="Approved">Approved</option>
              <option value="Declined">Declined</option>
            </select>
          </label>
          <Button onClick={handleSubmit} type="button">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditBookingModal;
