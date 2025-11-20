import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  physicalAddress: string;
  phoneNumber: string;
  profilePicUrl?: string;
  password: string;
  createdAt?: Date;
}

export const createUser = createAsyncThunk(
  "user/createUser",
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://booknestbackend-lljq.onrender.com/users",
        user
      );
      if (response.status === 201) return response.data;
      else return rejectWithValue(response.data.message);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserProfile: (state, action) => {
      // merge existing user data with the provided fields
      state.user = { ...(state.user ?? {}), ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { updateUserProfile } = userSlice.actions;

export default userSlice.reducer;
