import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartBox: [],
  totalValue: 0,
};

const cartBoxSlicer = createSlice({
  name: "cartBox",
  initialState,
  reducers: {
    fetchCartItems: (state, action) => {
      state.cartBox = action.payload;
    },
    addItemToBasket: (state, action) => {
      state.cartBox = [action.payload, ...state.cartBox];
    },
    removeItemFromBasket: (state, action) => {
      state.cartBox = state.cartBox.filter((crt) => crt.id !== action.payload);
    },
    getTotalValue: (state, action) => {
      state.totalValue = action.payload;
    },
  },
});

export const {
  fetchCartItems,
  addItemToBasket,
  removeItemFromBasket,
  getTotalValue,
} = cartBoxSlicer.actions;

export default cartBoxSlicer.reducer;
