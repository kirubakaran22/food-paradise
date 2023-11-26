import { createSlice, current } from "@reduxjs/toolkit";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: defaultCartState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      state.totalAmount += newItem.price * newItem.amount;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingCartItemIndex != -1) {
        state.items[existingCartItemIndex].amount += newItem.amount;
      } else {
        state.items = state.items.concat(newItem);
      }
      localStorage.setItem("cart", JSON.stringify(current(state)));
    },
    removeFromCart(state, action) {
      const itemToRemove = action.payload;
      console.log(itemToRemove);
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === itemToRemove
      );
      state.totalAmount -= state.items[existingCartItemIndex].price;
      if (state.items[existingCartItemIndex].amount === 1) {
        state.items = state.items.filter((item) => item.id !== itemToRemove);
      } else {
        state.items[existingCartItemIndex].amount -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(current(state)));
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      localStorage.removeItem("cart");
    },
    replaceCart(state, action) {
      const cart = action.payload;
      state.items = cart.items;
      state.totalAmount = cart.totalAmount;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
