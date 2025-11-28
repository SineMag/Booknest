// src/features/inventoryManagement/inventoryManagementSlice.ts
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

export type Hotel = {
  id: number;
  name: string;
  description: string;
  imagegallery: string[];
  amenities: string[];
  physicaladdress: string;
  phonenumber: string;
  emailaddress: string;
  roomtypes: string[];
  rating: number;
};

interface InventoryState {
  hotels: Hotel[];
  loading: boolean;
  error: string | null;
}

const initialState: InventoryState = {
  hotels: [],
  loading: false,
  error: null,
};

const API_URL = "https://booknestapi.netlify.app/accomodations";

// Fetch all hotels
export const fetchHotels = createAsyncThunk(
  "inventory/fetchHotels",
  async () => {
    const res = await axios.get<Hotel[]>(API_URL);
    const data = res.data.map((h: any) => ({
      id: Number(h.id ?? h._id),
      name: h.name ?? "",
      description: h.description ?? "",
      imagegallery: Array.isArray(h.imagegallery) ? h.imagegallery : [],
      amenities: Array.isArray(h.amenities) ? h.amenities : [],
      physicaladdress: h.physicaladdress ?? "",
      phonenumber: h.phonenumber ?? "",
      emailaddress: h.emailaddress ?? "",
      roomtypes: Array.isArray(h.roomtypes) ? h.roomtypes : [],
      rating: Number(h.rating) || 0,
    }));
    return data;
  }
);

// Add a new hotel
export const addHotel = createAsyncThunk(
  "inventory/addHotel",
  async (hotel: Partial<Hotel>) => {
    const res = await axios.post(API_URL, hotel);
    return {
      ...res.data,
      id: Number(res.data.id ?? res.data._id),
      imagegallery: Array.isArray(res.data.imagegallery)
        ? res.data.imagegallery
        : [],
      amenities: Array.isArray(res.data.amenities) ? res.data.amenities : [],
      roomtypes: Array.isArray(res.data.roomtypes) ? res.data.roomtypes : [],
    };
  }
);

// Update hotel
export const updateHotel = createAsyncThunk(
  "inventory/updateHotel",
  async ({ id, hotel }: { id: number; hotel: Partial<Hotel> }) => {
    const res = await axios.put(`${API_URL}/${id}`, hotel);
    return {
      ...res.data,
      id: Number(res.data.id ?? res.data._id),
      imagegallery: Array.isArray(res.data.imagegallery)
        ? res.data.imagegallery
        : [],
      amenities: Array.isArray(res.data.amenities) ? res.data.amenities : [],
      roomtypes: Array.isArray(res.data.roomtypes) ? res.data.roomtypes : [],
    };
  }
);

// Delete hotel
export const deleteHotel = createAsyncThunk(
  "inventory/deleteHotel",
  async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const inventoryManagementSlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch hotels
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

      // Add hotel
      .addCase(addHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addHotel.fulfilled, (state, action: PayloadAction<Hotel>) => {
        state.hotels.push(action.payload);
        state.loading = false;
      })
      .addCase(addHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to add hotel";
      })

      // Update hotel
      .addCase(updateHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHotel.fulfilled, (state, action: PayloadAction<Hotel>) => {
        state.hotels = state.hotels.map((h) =>
          h.id === action.payload.id ? action.payload : h
        );
        state.loading = false;
      })
      .addCase(updateHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to update hotel";
      })

      // Delete hotel
      .addCase(deleteHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteHotel.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.hotels = state.hotels.filter((h) => h.id !== action.payload);
          state.loading = false;
        }
      )
      .addCase(deleteHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to delete hotel";
      });
  },
});

export default inventoryManagementSlice.reducer;
