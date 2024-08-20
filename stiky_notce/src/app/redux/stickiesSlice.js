// redux/stickiesSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('Stickies');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

const initialState = loadState();

const stickiesSlice = createSlice({
  name: 'stickies',
  initialState,
  reducers: {
    addSticky: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('Stickies', JSON.stringify(state));
    },
    deleteSticky: (state, action) => {
      const index = state.findIndex(sticky => sticky.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
        localStorage.setItem('Stickies', JSON.stringify(state));
      }
    },
  },
});

export const { addSticky, deleteSticky } = stickiesSlice.actions;
export default stickiesSlice.reducer;
