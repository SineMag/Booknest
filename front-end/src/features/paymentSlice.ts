import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8888";
// const BASE_URL = "http://localhost:8888";

export interface Payment {
  email: string;
  amount: number;
  reference?: string;
  access_code?: string;
  loading?: boolean;
  callback_url?: string;
  transaction?: any;
}

const initialState: Payment = {
  email: "",
  amount: 0,
  reference: "",
  access_code: "",
  loading: false,
  transaction: null,
};

export const initializePayment = createAsyncThunk(
  "payment/initialize",
  async (payment: Payment) => {
    console.log("initializing payment...", payment);
    console.log(`${BASE_URL}/payment/initialize`);
    const response = await axios.post(`${BASE_URL}/payment/initialize`, {
      email: payment.email,
      amount: payment.amount, // amount must be in kobo (₦500 = 50000)
    });

    console.log("React response", response.data);
    return response.data.data;
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializePayment.fulfilled, (state, action) => {
        state.reference = action.payload.reference;
        state.access_code = action.payload.access_code;
        state.transaction = action.payload;
        console.log("reference", state.reference);
        console.log("access_code", state.access_code);
        console.log("SUCESSFUL PAYMENT INITIALIZATION!");
      })
      .addCase(initializePayment.rejected, (state) => {
        state.reference = "";
        console.log("PAYMENT INITIALIZATION FAILED!");
      });
  },
});

export default paymentSlice.reducer;
