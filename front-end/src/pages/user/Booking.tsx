import React, { useState } from 'react';
import Navbar from '../../components/NavBar/Navbar';
import Footer from '../../components/footer/Footer';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';

export default function Booking() {
  const [rooms, setRooms] = useState('');
  const [guests, setGuests] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [phone, setPhone] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');

  const handleProceed = () => {
    // TODO: Proceed to payment logic
    alert('Proceeding to payment...');
  };

  const handleCancel = () => {
    // TODO: Cancel logic, maybe clear form or navigate
    alert('Appointment cancelled.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 20px' }}>
        <div style={{ maxWidth: '500px', width: '100%', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Book Your Stay</h1>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <InputField
              type="number"
              placeholder="Number of Rooms"
              field={rooms}
              setField={setRooms}
            />
            <InputField
              type="number"
              placeholder="Number of Guests"
              field={guests}
              setField={setGuests}
            />
            <InputField
              type="date"
              placeholder="Check-in Date"
              field={checkIn}
              setField={setCheckIn}
            />
            <InputField
              type="date"
              placeholder="Check-out Date"
              field={checkOut}
              setField={setCheckOut}
            />
            <InputField
              type="tel"
              placeholder="Phone Number"
              field={phone}
              setField={setPhone}
            />
            <InputField
              type="time"
              placeholder="Arrival Time"
              field={arrivalTime}
              setField={setArrivalTime}
            />
            <InputField
              type="text"
              placeholder="Special Request"
              field={specialRequest}
              setField={setSpecialRequest}
            />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
              <Button onClick={handleProceed} variant="primary">
                Proceed to Payment
              </Button>
              <Button onClick={handleCancel} variant="secondary">
                Cancel Appointment
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}