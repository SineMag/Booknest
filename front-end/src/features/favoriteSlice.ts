import axios from "axios";
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Favorite } from "../types/Favourite";

interface FavoriteState {
  favorites: Favorite[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoriteState = {
  favorites: [],
  loading: false,
  error: null,
};
const BASE_URL = "https://booknestapi.netlify.app/favourites";

export const addToFavourites = createAsyncThunk(
  "favorites/addFavourites",
  async (
    {
      userId,
      accommodationId,
    }: {
      userId: number;
      accommodationId: number;
    },
    { rejectWithValue }
  ) => {
    console.log("... add to favourites thunk", userId, accommodationId);
    try {
      const { data } = await axios.post(BASE_URL, { userId, accommodationId });
      console.log(101, data);
      if (data) return data;
      else rejectWithValue("Failed to add to favorites");
    } catch (error) {
      rejectWithValue(error as string);
    }
  }
);

export const removeFavourite = createAsyncThunk(
  "favorites/removeFavorite",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/${id}`);
      if (!data) rejectWithValue("Failed to remove from favorites");
      return data;
    } catch (error) {
      rejectWithValue(error as string);
    }
  }
);

export const getFavouriteByUserId = createAsyncThunk(
  "favorites/getFavoriteById",
  async (userId: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/user/${userId}`);
      if (!data) rejectWithValue("Failed to fetch favorites");
      return data;
    } catch (error) {
      rejectWithValue(error as string);
    }
  }
);

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to favorites
      .addCase(addToFavourites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addToFavourites.fulfilled,
        (state, action: PayloadAction<Favorite[]>) => {
          state.loading = false;
          console.log(1111, action.payload)
          state.favorites.push(action.payload[0]);
          console.log("SUCCESS ADD TO FAVOURITES/..");
        }
      )
      .addCase(addToFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add to favorites";
      })

      // Remove from favorites
      .addCase(removeFavourite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFavourite.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = state.favorites.filter(
          (fav) =>
            !(
              fav.userId === action.payload.userId &&
              fav.accommodationId === action.payload.accommodationId
            )
        );
      })
      .addCase(removeFavourite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to remove from favorites";
      })

      // Get favorites by user ID
      .addCase(getFavouriteByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getFavouriteByUserId.fulfilled,
        (state, action: PayloadAction<Favorite[]>) => {
          state.loading = false;
          state.favorites = action.payload.flat();
        }
      )
      .addCase(getFavouriteByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch favorites";
      });
  },
});

export const { clearError } = favoriteSlice.actions;
export default favoriteSlice.reducer;
