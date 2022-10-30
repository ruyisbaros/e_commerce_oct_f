import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartBox: [],
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
  },
});

export const { fetchCartItems, addItemToBasket, removeItemFromBasket } =
  cartBoxSlicer.actions;

export default cartBoxSlicer.reducer;
