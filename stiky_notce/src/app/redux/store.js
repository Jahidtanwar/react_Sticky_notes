// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import stickiesReducer from './stickiesSlice';

const store = configureStore({
  reducer: {
    stickies: stickiesReducer,
  },
});

export default store;
