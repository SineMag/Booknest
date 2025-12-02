import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Admin } from "../types/Admin";

const BASE_URL = "https://booknestapi.netlify.app/admins";

interface adminState {
  admins: Admin[];
  admin: Admin | null;
  loading: boolean;
  error: string;
}

const initialState: adminState = {
  admins: [] as Admin[],
  admin: null,
  loading: false,
  error: "",
};

export const fetchAdmins = createAsyncThunk("admin/fetchAdmins", async () => {
  const response = await axios.get(`${BASE_URL}/register`);
  return response.data;
});

export const registerAdmin = createAsyncThunk(
  "admin/registerAdmin",
  async (admin: Admin, { rejectWithValue }) => {
    try {
      console.log("register thunk...");
      const response = await axios.post(`${BASE_URL}/register`, admin);
      console.log(response);
      if (response.status === 201) return response.data;
      else return rejectWithValue(response.data.message);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async (credentails: any, { rejectWithValue }) => {
    try {
      console.log("login thunk...");
      const response = await axios.post(`${BASE_URL}/register`, credentails);
      console.log(response);
      if (response.status === 200) return response.data;
      else return rejectWithValue(response.data.message);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateAdmin = createAsyncThunk(
  "admin/updateAdmin",
  async (admin: Admin, { rejectWithValue }) => {
    try {
      console.log("update thunk...");
      const response = await axios.put(
        `${BASE_URL}/${admin.id}`, // Corrected URL
        admin
      );
      console.log("@update response: ", response);
      if (response.status === 200) return response.data;
      else return rejectWithValue(response.data.message);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteAdmin = createAsyncThunk(
  "admin/deleteAdmin",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      if (response.status === 200) return response.data;
      else return rejectWithValue(response.data.message);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.admins = action.payload;
        state.loading = false;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.loading = false;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.loading = false;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.loading = false;
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAdmin.fulfilled, (state) => {
        state.admin = null;
        state.loading = false;
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteAdmin.pending, (state) => {
        state.loading = true;
      });
  },
});

export default adminSlice.reducer;
