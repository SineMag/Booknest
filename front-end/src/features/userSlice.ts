import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:8888";

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
      const response = await axios.post(API_BASE_URL + "/auth/register", user);
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

export const uploadProfilePic = createAsyncThunk(
  "user/uploadProfilePic",
  async (file: File, { rejectWithValue }) => {
    try {
      const fileName = `uploads/${Date.now()}-${file.name}`;
      console.log(101, file);

      // 1️⃣ Request signed URL from backend
      const { data } = await axios.post(
        `${API_BASE_URL}/users/uploadPic`,
        {
          fileName,
        },
        {
          headers: {
            "Content-Type": file.type,
          },
        }
      );

      console.log(102, data);

      const { signedUrl } = data;

      // 2️⃣ Upload file directly to Supabase Storage
      await axios.put(signedUrl, file, {
        headers: { "Content-Type": file.type },
      });

      // 3️⃣ Return uploaded file info
      return { fileName, url: signedUrl.split("?")[0] }; // public URL
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
    builder.addCase(uploadProfilePic.fulfilled, (state, action) => {
      console.log("payload", action.payload, "SUCCESS UPLOAD PROFILE!");
    });
    builder.addCase(uploadProfilePic.rejected, () => {
      console.log("Error: payload invalid");
    });
  },
});

export default userSlice.reducer;
