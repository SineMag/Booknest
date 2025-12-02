import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Booking } from "../types/Booking";

interface BookingState {
  bookings: Booking[];
  booking: Booking | null;
  clientSecret: string | null;
  loading: boolean;
  error: string;
}

const initialState: BookingState = {
  bookings: [],
  booking: null,
  clientSecret: null,
  loading: false,
  error: "",
};

const BASE_URL = "http://localhost:8888/bookings";

export const fetchBookingsByUser = createAsyncThunk(
  "booking/fetchBookingsByUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch bookings.");
      }
      const data = await response.json();
      console.log("Raw bookings data from API:", data);
      const filteredData = data.filter(
        (booking: Booking) => booking.userId === Number(userId)
      );
      console.log("Filtered bookings data:", filteredData);
      return filteredData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData: Booking, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      if (!response.ok) {
        throw new Error("Failed to create booking.");
      }
      const data = await response.json();
      console.log("BOOKED!");
      return data;
    } catch (error: any) {
      console.log("ERROR BOOKING...");
      return rejectWithValue(error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBookingsByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookingsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookingsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bookingSlice.reducer;
