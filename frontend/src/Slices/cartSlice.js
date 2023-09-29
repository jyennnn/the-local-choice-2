import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";
const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems : []}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload
            console.log("item", item)

            const existItem = state.cartItems.find((x) => x._id === item._id)

            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                  x._id === existItem._id ? { ...x, quantity: x.quantity + item.quantity } : x
                );
              } else {
                state.cartItems = [...state.cartItems, item];
              }
              
              return updateCart(state)

        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)

            return updateCart(state)
        },
        clearCart: (state, action) => {
          state.cartItems = [];
          return updateCart(state)
      },
    }
})

export const { addToCart , removeFromCart, clearCart} = cartSlice.actions;

export default cartSlice.reducer