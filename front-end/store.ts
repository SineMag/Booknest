import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./src/features/userSlice";
import bookingReducer from "./src/features/bookingSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
