import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderId: 'id',
  orderData: [], // Store the order data
};

const orderDataSlice = createSlice({
  name: 'orderData',
  initialState,
  reducers: {
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
    setOrderData: (state, action) => {
      state.orderData = action.payload;
    },
  },
});

export const { setOrderId, setOrderData } = orderDataSlice.actions;
export default orderDataSlice.reducer;
