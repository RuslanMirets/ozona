import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../models/user';

export interface UserState {
  users: IUser[];
}

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const userReduer = userSlice.reducer;
