import { createSlice } from '@reduxjs/toolkit';

export interface IAlert {
  success?: string | string[];
  errors?: string | string[];
}

const initialState: IAlert = {
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

export const alertReduer = alertSlice.reducer;
