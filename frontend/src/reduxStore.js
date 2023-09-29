import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./Slices/apiSlice";
import cartSliceReducer from "./Slices/cartSlice";
import sortingSliceReducer from "./Slices/sortingSlice";
import orderDataSliceReducer from "./Slices/orderDataSlice";

const reduxStore = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
        sorting: sortingSliceReducer,
        orderData: orderDataSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default reduxStore