// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/ProductSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    // Add other reducers if needed
  },
});

export default store;
