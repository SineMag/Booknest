import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Booking } from "../types/Booking";
import axios from "axios";

interface BookingState {
  booking: Booking | null;
  loading: boolean;
  error: string;
}

const initialState: BookingState = {
  booking: null,
  loading: true,
  error: "",
};

const BASE_URL = "http://localhost:8888/bookings";

export const fetchBookings = createAsyncThunk(
  "booking/fetchBookings",
  async () => {
    const { data } = await axios.get(BASE_URL);
    return data;
  }
);

export const fetchBookingById = createAsyncThunk(
  "booking/fetchBookingById",
  async (id: number) => {
    const { data } = await axios.get(`${BASE_URL}/${id}`);
    return data;
  }
);

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData: Booking, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(BASE_URL, bookingData);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to create booking"
      );
    }
  }
);

export const updateBooking = createAsyncThunk(
  "booking/updateBooking",
  async (bookingData: Booking, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/${bookingData.id}`,
        bookingData
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to update booking"
      );
    }
  }
);

export const deleteBooking = createAsyncThunk(
  "booking/deleteBooking",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to delete booking"
      );
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
      .addCase(createBooking.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
      })
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
      })
      .addCase(fetchBookingById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bookingSlice.reducer;
