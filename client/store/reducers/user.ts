import { UserState, UserAction, UserActionTypes } from './../../types/user';

const initialState: UserState = {
  users: [],
};

export const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_USERS:
      return { users: action.payload };
    default:
      return state;
  }
};
