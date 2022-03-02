import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
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
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.users = action.payload.user.users;
    },
  },
});

export const userReducer = userSlice.reducer;
