import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { UserBooking } from '../../../Backend/models/UserBookings';

interface BookingState {
  booking: UserBooking | null;
  clientSecret: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

const initialState: BookingState = {
  booking: null,
  clientSecret: null,
  status: 'idle',
  error: null,
};

export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (bookingData: Omit<UserBooking, 'id' | 'created_at' | 'status'>, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/bookings', { // Assuming you have a proxy set up for /api
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      if (!response.ok) {
        throw new Error('Failed to create booking.');
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPaymentIntent = createAsyncThunk(
  'booking/createPaymentIntent',
  async (bookingId: number, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/payments/create-payment-intent', { // Assuming proxy
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingId }),
      });
      if (!response.ok) {
        throw new Error('Failed to create payment intent.');
      }
      const data = await response.json();
      return data.clientSecret;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.booking = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(createPaymentIntent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clientSecret = action.payload;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default bookingSlice.reducer;
