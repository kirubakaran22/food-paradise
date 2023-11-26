import { configureStore } from "@reduxjs/toolkit";

import loginStatusSlice from "./loginStatusSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: { login: loginStatusSlice.reducer, cart: cartSlice.reducer },
});

export default store;
