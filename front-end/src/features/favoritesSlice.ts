import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 1. Define the Interface strictly
export interface Favourite {
  id?: number;
  userId: number;
  accommodationId: number;
  created_at?: string;
}

interface FavouritesState {
  favourites: Favourite[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FavouritesState = {
  favourites: [],
  isLoading: false,
  error: null,
};

const BASE_URL = "https://booknestapi.netlify.app/favourites";

// --- Async Thunks ---

export const getFavouritesByUser = createAsyncThunk(
  "favorites/getFavouritesByUser",
  async (userId: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/user/${userId}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch");
    }
  },
);

export const addToFavourites = createAsyncThunk(
  "favorites/addToFavourites",
  async (favourite: Favourite, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(BASE_URL, favourite);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to add");
    }
  },
);

export const removeFavourite = createAsyncThunk(
  "favorites/removeFavourite",
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return id; // Return the ID so we can filter the state
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to remove");
    }
  },
);

// --- The Slice ---

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    // Regular reducer to clear state on logout
    clearFavorites: (state) => {
      state.favourites = [];
    },
    addFavorite: (state) => {
      state.favourites = [];
    },
    removeFavorite: (state) => {
      state.favourites = [];
    },
    setFavorites: (state) => {
      state.favourites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Case 1: Fetching
      .addCase(getFavouritesByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFavouritesByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favourites = action.payload || [];
      })
      // Case 2: Adding
      .addCase(addToFavourites.fulfilled, (state, action) => {
        if (action.payload) {
          state.favourites.push(action.payload);
        }
      })
      // Case 3: Removing
      .addCase(removeFavourite.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.favourites = state.favourites.filter(
          (fav) => fav.id !== deletedId,
        );
      });
  },
});

export const { clearFavorites, addFavorite, removeFavorite, setFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
