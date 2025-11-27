import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./src/features/userSlice";
import bookingReducer from "./src/features/bookingSlice";
import paymentReducer from "./src/features/paymentSlice";
import hotelReducer from "./src/features/InventoryManagementSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    booking: bookingReducer,
    payment: paymentReducer,
    hotels: hotelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
