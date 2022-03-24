import { UserState, UserAction, UserActionTypes } from './../../types/user';

const initialState: UserState = {
  users: [],
  userData: null,
};

export const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_USERS:
      return { ...state, users: action.payload };
    case UserActionTypes.LOGIN:
      return { ...state, userData: action.payload };
    case UserActionTypes.LOGOUT:
      return { ...state, userData: null };
    default:
      return state;
  }
};
