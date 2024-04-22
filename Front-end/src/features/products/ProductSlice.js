import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";

export const getProducts = createAsyncThunk("products/getProducts", async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await productService.fetchProducts();
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  products: [],
  loading: false,
  error: null,
  cart: {
    items: [],
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    LOAD_SAVED_CART: (state, action) => {
      state.cart.items = action.payload;
    },
    addToCart: (state, action) => {
      const itemIndex = state.cart.items.findIndex((item) => item._id === action.payload._id);
      if (itemIndex >= 0) {
        state.cart.items[itemIndex].quantity += 1;
      } else {
        state.cart.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.cart.items.findIndex((item) => item._id === action.payload._id);
      if (itemIndex >= 0) {
        state.cart.items[itemIndex].quantity -= 1;
        if (state.cart.items[itemIndex].quantity === 0) {
          state.cart.items.splice(itemIndex, 1);
        }
      }
    },
    removeItemCompletely: (state, action) => {
      const index = state.cart.items.findIndex((item) => item._id === action.payload._id);
      if (index !== -1) {
        state.cart.items.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.cart.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addToCart, removeFromCart, removeItemCompletely, clearCart, LOAD_SAVED_CART } = productSlice.actions;

export default productSlice.reducer;
