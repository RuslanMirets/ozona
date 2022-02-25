import { authSlice } from './../slices/auth';
import { postAPI } from './../../utils/FetchData';
import { AppDispatch } from './../store';
import { IUser } from './../../models/user';

export const login = (userData: IUser) => async (dispatch: AppDispatch) => {
  try {
    const response = await postAPI('auth/login', userData);
    dispatch(authSlice.actions.login(response.data));
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};
