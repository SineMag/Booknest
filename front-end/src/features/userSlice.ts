import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  physicalAddress: string;
  phoneNumber: string;
  password: string;
  profilePicUrl?: string;
  createdAt?: Date;
}

export interface LoginCredentials {
  emailAddress: string;
  password: string;
}

export const createUser = createAsyncThunk(
  "user/createUser",
  async (user: User, { rejectWithValue }) => {
    try {
      console.log("register thunk...");
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        user
      );
      console.log(response);
      if (response.status === 201) return response.data;
      else return rejectWithValue(response.data.message);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentails: LoginCredentials, { rejectWithValue }) => {
    try {
      console.log("login thunk...");
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        credentails
      );
      console.log(response);
      if (response.status === 200 && response.data.length > 0)
        return response.data;
      else return rejectWithValue(response.data.message);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (user: User, { rejectWithValue }) => {
    try {
      console.log("update thunk...");
      const response = await axios.put(
        `http://localhost:5000/users/${user.id}`,
        user
      );
      console.log("@update response: ", response);
      if (response.status === 200) return response.data;
      else return rejectWithValue(response.data.message);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  user: null,
  isLoggedIn: false,
  errorMessage: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      console.log("payload", action.payload, "SUCCESS REGISTER!");
      state.user = action.payload;
    });
    builder.addCase(createUser.rejected, () => {
      console.log("Error: payload invalid");
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log("payload", action.payload, "SUCCESS LOGIN!");
      state.user = action.payload[0];
      state.isLoggedIn = true;
    });
    builder.addCase(loginUser.rejected, () => {
      console.log("Error: payload invalid");
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      console.log("payload", action.payload, "SUCCESS UPDATE!");
      state.user = action.payload;
    });
    builder.addCase(updateProfile.rejected, () => {
      console.log("Error: payload invalid");
    });
  },
});

export default userSlice.reducer;
