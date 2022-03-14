import { createSlice } from '@reduxjs/toolkit';

export interface AlertState {
  success?: string | string[];
  errors?: string | string[];
}

const initialState: AlertState = {
  success: '',
  errors: '',
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    success(state, action) {
      state.success = action.payload;
    },
    errors(state, action) {
      state.errors = action.payload;
    },
  },
});

export const alertReducer = alertSlice.reducer;
