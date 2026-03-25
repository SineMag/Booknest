import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Accomodation } from "../types/Accomodation";
import axios from "axios";

const initialState = {
  accomodations: [] as Accomodation[],
  current: {} as Accomodation,
  loading: true,
  error: "",
};

const BASE_URL = "https://booknestapi.netlify.app/accomodations";

export const fetchAccomodations = createAsyncThunk(
  "accomodations/fetchAccomodations",
  async () => {
    const res = await axios.get<Accomodation[]>(BASE_URL);
    const data = res.data.map((h: any) => ({
      ...h,
      id: h.id ?? h._id,
      imagegallery: Array.isArray(h.imagegallery) ? h.imagegallery : [],
      amenities: Array.isArray(h.amenities) ? h.amenities : [],
      roomtypes: Array.isArray(h.roomtypes) ? h.roomtypes : [],
    }));
    return data;
  },
);

export const fetchAccomodationById = createAsyncThunk(
  "accomodations/fetchAccomodationById",
  async (id: string) => {
    const res = await axios.get(`${BASE_URL}/${id}`);
    const data = Array.isArray(res.data) ? res.data : [res.data];
    return data.map((h: any) => ({
      ...h,
      id: h.id ?? h._id,
      imagegallery: Array.isArray(h.imagegallery) ? h.imagegallery : [],
      amenities: Array.isArray(h.amenities) ? h.amenities : [],
      roomtypes: Array.isArray(h.roomtypes) ? h.roomtypes : [],
    }));
  },
);

const accomodationSlice = createSlice({
  name: "accomodations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccomodations.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchAccomodations.fulfilled, (state, action) => {
        state.accomodations = action.payload;
        state.loading = false;
      })
      .addCase(fetchAccomodations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch accomodations";
      })
      .addCase(fetchAccomodationById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchAccomodationById.fulfilled, (state, action) => {
        state.current = action.payload[0] || {};
        state.loading = false;
      })
      .addCase(fetchAccomodationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch accomodation";
      });
  },
});

export default accomodationSlice.reducer;
