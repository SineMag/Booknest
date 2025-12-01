import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./src/features/userSlice";
import bookingReducer from "./src/features/bookingSlice";
import paymentReducer from "./src/features/paymentSlice";
import accomodationReducer from "./src/features/accomodationSlice";

export const store = configureStore({
  reducer: {
    accomodation: accomodationReducer,
    booking: bookingReducer,
    payment: paymentReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
