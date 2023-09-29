import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortBy: 'name',
  sortedProducts: [], // Store the sorted products
};

const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortedProducts: (state, action) => {
      state.sortedProducts = action.payload;
    },
  },
});

export const { setSortBy, setSortedProducts } = sortingSlice.actions;
export default sortingSlice.reducer;
