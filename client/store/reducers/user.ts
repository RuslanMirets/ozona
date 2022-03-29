import { UserState, UserAction, UserActionTypes } from './../../types/user';

const initialState: UserState = {
  users: [],
  userData: null,
  registerData: null,
};

export const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_USERS:
      return { ...state, users: action.payload };
    case UserActionTypes.LOGIN:
      return { ...state, userData: action.payload };
    case UserActionTypes.REGISTER:
      return { ...state, registerData: action.payload };
    case UserActionTypes.LOGOUT:
      return { ...state, userData: null };
    case UserActionTypes.UPDATE_NAME:
      return { ...state, userData: { ...state.userData, name: action.payload } };
    case UserActionTypes.UPDATE_AVATAR:
      return { ...state, userData: { ...state.userData, avatar: action.payload } };
    default:
      return state;
  }
};
