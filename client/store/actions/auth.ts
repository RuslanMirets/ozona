import { authSlice } from './../slices/auth';
import { getAPI, postAPI } from './../../utils/FetchData';
import { AppDispatch } from './../store';
import { IUser } from './../../models/user';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { alertSlice } from '../slices/alert';

export const login = (userData: IUser) => async (dispatch: AppDispatch) => {
  try {
    const response = await postAPI('auth/login', userData);
    setCookie(null, 'ozonaToken', response.data.token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    dispatch(authSlice.actions.login(response.data));
    dispatch(alertSlice.actions.success('Успешная авторизация'));
  } catch (error: any) {
    dispatch(alertSlice.actions.errors(error.response.data.message));
  }
};

export const register = (userData: IUser) => async (dispatch: AppDispatch) => {
  try {
    const response = await postAPI('auth/register', userData);
    dispatch(authSlice.actions.register(response.data));
    dispatch(alertSlice.actions.success('Успешная регистрация'));
  } catch (error: any) {
    dispatch(alertSlice.actions.errors(error.response.data.message));
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    destroyCookie(null, 'ozonaToken', null);
    dispatch(authSlice.actions.logout());
    dispatch(alertSlice.actions.success('Выход из системы'));
  } catch (error: any) {
    dispatch(alertSlice.actions.errors(error.response.data.message));
  }
};

export const isAuth = (ctx: any) => async (dispatch: AppDispatch) => {
  try {
    const { ozonaToken } = parseCookies(ctx);
    const response = await getAPI('user/profile', ozonaToken);
    dispatch(authSlice.actions.login(response.data));
  } catch (error) {
    console.log('Is auth error');
  }
};
