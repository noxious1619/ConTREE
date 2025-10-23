import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../features/home/homeSlice'; 
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer, // manages the number of users in the counter page
  },
});

export default store;
