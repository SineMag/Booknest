import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Booking } from "../types/Booking";
import axios from "axios";

interface BookingState {
  bookings: Booking[];
  booking: Booking | null;
  loading: boolean;
  error: string;
}

const initialState: BookingState = {
  bookings: [],
  booking: null,
  loading: false,
  error: "",
};

const BASE_API = "https://booknestapi.netlify.app/bookings";

export const fetchBookingsByUser = createAsyncThunk(
  "booking/fetchBookingsByUser",
  async (userId: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_API}?userId=${userId}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch bookings");
    }
  }
);

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData: Booking, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_API}`, bookingData);

      if (!data) {
        return rejectWithValue("Error creating booking");
      }
      return data;
    } catch (error: any) {
      console.error("Error creating booking:", error);
      return rejectWithValue(error.message || "Failed to create booking");
    }
  }
);

export const updateBooking = createAsyncThunk(
  "booking/updateBooking",
  async (bookingData: Booking, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${BASE_API}/${bookingData.id}`,
        bookingData
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBooking = createAsyncThunk(
  "booking/deleteBooking",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${BASE_API}/${id}`);
      return data;
    } catch (error: any) {
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
        state.error = "";
        // Handle both array and single object responses
        const booking = Array.isArray(action.payload) ? action.payload[0] : action.payload;
        state.booking = booking;
        if (booking) {
          state.bookings.push(booking);
        }
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
