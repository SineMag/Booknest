import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import styles from "./EditBookingModal.module.css";
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
  const [formData, setFormData] = useState<Omit<BookingData, 'checkIn' | 'checkOut'> | null>(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7), // Default to 7 days from now
      key: 'selection'
    }
  ]);

  useEffect(() => {
    if (bookingData) {
      const { checkIn, checkOut, ...rest } = bookingData;
      setFormData(rest);
      setDateRange([
        {
          startDate: new Date(checkIn),
          endDate: new Date(checkOut),
          key: 'selection'
        }
      ]);
    }
  }, [bookingData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleDateChange = (item: any) => {
    setDateRange([item.selection]);
  };

  const handleSubmit = () => {
    if (formData && dateRange[0].startDate && dateRange[0].endDate) {
      onSave({
        ...formData,
        checkIn: dateRange[0].startDate.toISOString().split('T')[0],
        checkOut: dateRange[0].endDate.toISOString().split('T')[0],
      });
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
          
          <div className={styles.dateRangePickerContainer}>
            <DateRangePicker
              ranges={dateRange}
              onChange={handleDateChange}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={1}
              direction="horizontal"
              rangeColors={['#B2FFB2']} // Pale green for highlighting
            />
          </div>

          <label>
            Status:
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
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
