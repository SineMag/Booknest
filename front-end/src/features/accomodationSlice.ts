import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Accomodation, IAccomodation } from "../types/Accomodation";
import axios from "axios";

const initialState = {
  accomodations: [] as Accomodation[],
  current: {} as Accomodation,
  loading: true,
  error: "",
};

const BASE_URL = "http://localhost:8888/accomodations";

export const fetchAccomodations = createAsyncThunk(
  "accomodations/fetchAccomodations",
  async () => {
    const { data } = await axios.get(BASE_URL);
    return data;
  }
);

export const fetchAccomodationById = createAsyncThunk(
  "accomodations/fetchAccomodationById",
  async (id: number) => {
    const { data } = await axios.get(`${BASE_URL}/${id}`);
    return data;
  }
);

export const createAccomodation = createAsyncThunk(
  "accomodations/createAccomodation",
  async (accomodation: IAccomodation) => {
    const { data } = await axios.post(BASE_URL, accomodation);
    return data;
  }
);

export const updateAccomodation = createAsyncThunk(
  "accomodations/updateAccomodation",
  async ({ id, accomodation }: { id: number; accomodation: IAccomodation }) => {
    const { data } = await axios.put(`${BASE_URL}/${id}`, accomodation);
    return data;
  }
);

export const deleteAccomodation = createAsyncThunk(
  "accomodations/deleteAccomodation",
  async (id: number) => {
    const { data } = await axios.delete(`${BASE_URL}/${id}`);
    return data;
  }
);

const accomodationSlice = createSlice({
  name: "accomodations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch accomodations
    builder.addCase(fetchAccomodations.fulfilled, (state, action) => {
      state.accomodations = action.payload;
      console.log("RES PAYLOAD: ", action.payload);
      state.loading = false;
    });
    builder.addCase(fetchAccomodations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAccomodations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    //fetch accomodation by id
    builder.addCase(fetchAccomodationById.fulfilled, (state, action) => {
      state.current = action.payload[0];
      state.loading = false;
    });
    builder.addCase(fetchAccomodationById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAccomodationById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //create accomodation
    builder.addCase(createAccomodation.fulfilled, (state, action) => {
      state.loading = false;
      state.accomodations.push(action.payload);
    });
    builder.addCase(createAccomodation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAccomodation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //update accomodation
    builder.addCase(updateAccomodation.fulfilled, (state, action) => {
      state.accomodations = state.accomodations.map((accomodation) => {
        if (accomodation.id === action.payload.id) {
          return action.payload;
        }
        return accomodation;
      });
      state.loading = false;
    });
    builder.addCase(updateAccomodation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAccomodation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //delete accomodation
    builder.addCase(deleteAccomodation.fulfilled, (state, action) => {
      state.accomodations = state.accomodations.filter(
        (accomodation) => accomodation.id !== action.payload.id
      );
      console.log(action.payload);
      state.loading = false;
    });
    builder.addCase(deleteAccomodation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAccomodation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default accomodationSlice.reducer;
