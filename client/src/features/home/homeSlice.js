import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  showCreatePool: false, // Determines if "Create a new pool" section is visible
};

// Create the slice
const homeSlice = createSlice({
  name: 'home',          // Slice name used in action types
  initialState,
  reducers: {
    toggleCreatePool: (state) => {
      state.showCreatePool = !state.showCreatePool; // Toggle visibility
    },
  },
});

// Export the action to use in components
export const { toggleCreatePool } = homeSlice.actions;

// Export the reducer to include in the store
export default homeSlice.reducer;
