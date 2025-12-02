import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://booknestapi.netlify.app/";

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
        API_BASE_URL + "/auth/register",
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
        API_BASE_URL + "/auth/login",
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
        API_BASE_URL + `/users/${user.id}`, // Corrected URL
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

const userFromLocalStorage = localStorage.getItem("user");

const parseUserFromStorage = (data: string | null) => {
  if (!data) return null;
  
  const user = JSON.parse(data);
  
  // Map the lowercase field names from API to the User interface
  return {
    id: user.id,
    firstName: user.firstname,
    lastName: user.lastname,
    emailAddress: user.emailaddress,
    phoneNumber: user.phonenumber,
    physicalAddress: user.physicaladdress,
    profilePicUrl: user.profilepicurl ?? null,
    password: user.password,
    createdAt: user.createdat,
  };
};

const initialState = {
  user: parseUserFromStorage(userFromLocalStorage),
  isLoggedIn: !!userFromLocalStorage, // Set isLoggedIn based on localStorage presence
  errorMessage: "",
  showProfileMenuSelector: false, // New state property
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("user");
    },
    setShowProfileMenuSelector: (state, action) => { // New reducer
      state.showProfileMenuSelector = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      console.log("payload", action.payload, "SUCCESS REGISTER!");
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Persist to localStorage
    });
    builder.addCase(createUser.rejected, (state, action) => {
      console.log("Error: payload invalid", action.payload);
      state.errorMessage = action.payload as string;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log("payload", action.payload, "SUCCESS LOGIN!");
      state.user = action.payload[0];
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(action.payload[0])); // Persist to localStorage
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      console.log("Error: payload invalid", action.payload);
      state.errorMessage = action.payload as string;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      console.log("payload", action.payload, "SUCCESS UPDATE!");
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Update localStorage
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      console.log("Error: payload invalid", action.payload);
      state.errorMessage = action.payload as string;
    });
  },
});

export const { logout, setShowProfileMenuSelector } = userSlice.actions; // Export logout action
export default userSlice.reducer;
