import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Booking, IBooking } from "../types/Booking";
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
      const { data } = await axios.get(`${BASE_API}/user/${userId}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData: IBooking, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_API}`, bookingData);

      console.log(7777, data);

      if (!data || data.length === 0) {
        rejectWithValue("Error creating booking");
      }
      return data;
    } catch (error: any) {
      console.log("ERROR BOOKING...");
      console.log(7777, error);
      return rejectWithValue(error.message);
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
        state.booking = action.payload;
        state.bookings.push(action.payload);
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
