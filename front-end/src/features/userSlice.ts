// IMPORTS
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { IUser, LoginCredentials, User } from "../types/User";
import { removeLocalUser } from "../utils/LocalStorage";

// CONST
const AUTH_BASE_URL = "https://booknestapi.netlify.app/auth";
const USER_BASE_URL = "https://booknestapi.netlify.app/users";

interface userState {
  current: User | null;
  loading: boolean;
  error: string;
}

const initialState: userState = {
  current: null,
  loading: false,
  error: "",
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async (user: User, { rejectWithValue }) => {
    try {
      console.log("register thunk...", { user });
      const response = await axios.post(AUTH_BASE_URL + "/register", user);
      console.log(600, response);
      if (response.status === 201) return response.data;
      else return rejectWithValue(response.data.message);
    } catch (error: any) {
      console.log(602, { error });
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentails: LoginCredentials, { rejectWithValue }) => {
    try {
      console.log("login thunk...");
      const response = await axios.post(AUTH_BASE_URL + "/login", credentails);
      console.log(response);
      if (response.status === 200 && response.data.length > 0)
        return response.data;
      else return rejectWithValue("Invalid email or password");
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (user: IUser, { rejectWithValue }) => {
    try {
      console.log("update thunk...");
      const response = await axios.put(USER_BASE_URL + `/${user.id}`, user);
      console.log("@update response: ", response);
      if (response.status === 200) return response.data;
      else return rejectWithValue(response.data.message);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.current = null;
      removeLocalUser();
    },
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error =
        (action.payload as string) || "Unknown error while creating user";
    });
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log(300, { user: action.payload[0] });
      state.current = action.payload[0];
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      console.log(603, { error: action.payload });
      state.error = action.payload as string;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;
