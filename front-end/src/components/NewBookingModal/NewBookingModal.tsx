import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import React, { useState } from "react";
import Button from "../Button/Button";
import styles from "./NewBookingModal.module.css";
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';

type BookingStatus = "Pending" | "Approved" | "Declined";

const mockAccommodations = [
  "Cozy Cottage",
  "Luxury Villa",
  "Beach House",
  "Mountain Cabin",
  "City Apartment",
];

interface NewBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newBookingData: any) => void;
}

const NewBookingModal: React.FC<NewBookingModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    accommodationName: mockAccommodations[0],
  });
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (item: any) => {
    setDateRange([item.selection]);
  };

  const handleSubmit = () => {
    if (dateRange[0].startDate && dateRange[0].endDate) {
      onSave({
        ...formData,
        checkIn: dateRange[0].startDate.toISOString().split('T')[0],
        checkOut: dateRange[0].endDate.toISOString().split('T')[0],
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>New Booking</h2>
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
            User Email:
            <input
              type="email"
              name="userEmail"
              value={formData.userEmail}
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

          <div className={styles.dateRangePickerContainer}>
            <DateRangePicker
              ranges={dateRange}
              onChange={handleDateChange}
              months={1}
              rangeColors={['#B2FFB2']} // Pale green for highlighting
            />
          </div>

          <Button onClick={handleSubmit} type="button">
            Create Booking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewBookingModal;
