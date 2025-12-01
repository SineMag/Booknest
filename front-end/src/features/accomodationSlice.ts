import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Accomodation } from "../types/Accomodation";

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
    const res = await fetch(BASE_URL);
    const data = await res.json();
    return data;
  }
);

export const fetchAccomodationById = createAsyncThunk(
  "accomodations/fetchAccomodationById",
  async (id: string) => {
    const res = await fetch(`${BASE_URL}/${id}`);
    const data = await res.json();
    return data;
  }
);

const accomodationSlice = createSlice({
  name: "accomodations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccomodations.pending, (state) => {
        state.loading = true;
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
      })
      .addCase(fetchAccomodationById.fulfilled, (state, action) => {
        state.current = action.payload[0];
        state.loading = false;
      })
      .addCase(fetchAccomodationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch accomodation";
      });
  },
});

export default accomodationSlice.reducer;
