import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Favourite } from "../types/Favourite";
import axios from "axios";

interface favouritesState {
  favourites: Favourite[];
}

const initialState: favouritesState = {
  favourites: [],
};

const BASE_URL = "https://booknestapi.netlify.app/favourites";

export const addToFavourites = createAsyncThunk(
  "favourites/addToFavourites",
  async (favourite: Favourite) => {
    try {
      const { data } = await axios.post(BASE_URL, favourite);

      if (data) return data;
    } catch (error) {}
  },
);

export const getFavouritesByUser = createAsyncThunk(
  "favourites/getFavouritesByUser",
  async (userId: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/user/${userId}`);
      return data;
    } catch (error: any) {
      // This ensures the action is dispatched as 'rejected'
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  },
);

export const removeFavourite = createAsyncThunk(
  "favourites/removeFavourite",
  async (id: number) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/${id}`);
      return data;
    } catch (error) {}
  },
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 1. Get Favorites: Replace the entire array with the fetched data
      .addCase(getFavouritesByUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.favourites = action.payload;
        }
      })

      // 2. Add to Favorites: Push the new favorite to the existing array
      .addCase(addToFavourites.fulfilled, (state, action) => {
        if (action.payload) {
          state.favourites.push(action.payload);
        }
      })

      // 3. Remove Favorite: Filter out the deleted item from the state
      .addCase(removeFavourite.fulfilled, (state, action) => {
        // Assuming your delete API returns the ID of the deleted item
        // or you can use action.meta.arg if the payload is empty
        const deletedId = action.meta.arg;
        state.favourites = state.favourites.filter(
          (fav) => fav.id !== deletedId,
        );
      });
  },
});

export default favoritesSlice.reducer;
