import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./src/features/userSlice";
import bookingReducer from "./src/features/bookingSlice";
import paymentReducer from "./src/features/paymentSlice";
import hotelReducer from "./src/features/InventoryManagementSlice";
import accomodationReducer from "./src/features/accomodationSlice";
import adminReducer from "./src/features/adminSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    booking: bookingReducer,
    payment: paymentReducer,
    hotels: hotelReducer,
    accomodation: accomodationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
