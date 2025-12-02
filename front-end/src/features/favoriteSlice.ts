import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export interface Favorite {
  id: number;
  userId: number;
  accommodationId: number;
}

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

// Async thunks
export const addToFavorites = createAsyncThunk(
  'favorites/addToFavorites',
  async ({ userId, accommodationId }: { userId: number; accommodationId: number }) => {
    // Use localStorage for local development to avoid CORS issues
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const newFavorite = {
      id: Date.now(),
      userId,
      accommodationId
    };
    favorites.push(newFavorite);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return newFavorite;
  }
);

export const removeFavorite = createAsyncThunk(
  'favorites/removeFavorite',
  async ({ userId, accommodationId }: { userId: number; accommodationId: number }) => {
    // Use localStorage for local development to avoid CORS issues
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = favorites.filter(
      (fav: { userId: number; accommodationId: number; }) => !(fav.userId === userId && fav.accommodationId === accommodationId)
    );
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    return { userId, accommodationId };
  }
);

export const getFavoriteById = createAsyncThunk(
  'favorites/getFavoriteById',
  async (userId: number) => {
    // Use localStorage for local development to avoid CORS issues
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const userFavorites = favorites.filter((fav: Favorite) => fav.userId === userId);
    return userFavorites;
  }
);

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to favorites
      .addCase(addToFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToFavorites.fulfilled, (state, action: PayloadAction<Favorite>) => {
        state.loading = false;
        state.favorites.push(action.payload);
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add to favorites';
      })
      
      // Remove from favorites
      .addCase(removeFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = state.favorites.filter(
          (fav) => !(fav.userId === action.payload.userId && fav.accommodationId === action.payload.accommodationId)
        );
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to remove from favorites';
      })
      
      // Get favorites by user ID
      .addCase(getFavoriteById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFavoriteById.fulfilled, (state, action: PayloadAction<Favorite[]>) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(getFavoriteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch favorites';
      });
  },
});

export const { clearError } = favoriteSlice.actions;
export default favoriteSlice.reducer;