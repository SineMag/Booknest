import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Hotel {
  _id?: string;
  name: string;
  description?: string;
  price?: number | string;
  location?: string;
  imageUrl?: string;
  createdBy?: string;
  createdAt?: string;
}

interface HotelState {
  hotels: Hotel[];
  loading: boolean;
  error: string | null;
}

const initialState: HotelState = {
  hotels: [],
  loading: false,
  error: null,
};

// Fetch hotels from hosted backend
export const fetchHotels = createAsyncThunk("hotels/fetch", async () => {
  const res = await axios.get<Hotel[]>(
    "https://booknestapi.netlify.app/accomodations",
    { withCredentials: true }
  );
  return res.data;
});

// Add a new hotel
export const addHotel = createAsyncThunk(
  "hotels/add",
  async (hotel: Partial<Hotel>, { dispatch }) => {
    const res = await axios.post(
      "https://booknestapi.netlify.app/accomodations",
      hotel,
      { withCredentials: true }
    );
    dispatch(fetchHotels());
    return res.data;
  }
);

const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchHotels.fulfilled,
        (state, action: PayloadAction<Hotel[]>) => {
          state.hotels = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch hotels";
      })
      .addCase(addHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addHotel.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to add hotel";
      });
  },
});

export default hotelSlice.reducer;
