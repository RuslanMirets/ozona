import { authSlice } from './../slices/auth';
import { postAPI } from './../../utils/FetchData';
import { AppDispatch } from './../store';
import { IUser } from './../../models/user';
import { setCookie, destroyCookie } from 'nookies';

export const login = (userData: IUser) => async (dispatch: AppDispatch) => {
  try {
    const response = await postAPI('auth/login', userData);
    setCookie(null, 'ozonaToken', response.data.token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    dispatch(authSlice.actions.login(response.data));
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    destroyCookie(null, 'ozonaToken', null);
    dispatch(authSlice.actions.logout());
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};
