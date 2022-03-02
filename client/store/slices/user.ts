import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IUser } from '../../models/user';

export interface UserState {
  users: IUser[];
  user: IUser | null;
}

const initialState: UserState = {
  users: [],
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsers(state, action) {
      state.users = action.payload;
    },
    profile(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.users = action.payload.user.users;
    },
  },
});

export const userReducer = userSlice.reducer;
