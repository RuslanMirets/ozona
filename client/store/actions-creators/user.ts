import { NotifyAction, NotifyActionTypes } from './../../types/notify';
import { getAPI, postAPI } from './../../utils/fetchData';
import { Dispatch } from 'react';
import { UserAction, UserActionTypes, IUser } from './../../types/user';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';

export const fetchUsers = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await getAPI('user');
      dispatch({ type: UserActionTypes.FETCH_USERS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const login = (data: IUser) => {
  return async (dispatch: Dispatch<UserAction | NotifyAction>) => {
    try {
      const response = await postAPI('auth/login', data);
      setCookie(null, 'ozonaToken', response.data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      dispatch({ type: UserActionTypes.LOGIN, payload: response.data });
      dispatch({ type: NotifyActionTypes.NOTIFY, payload: { success: 'Успешный вход' } });
    } catch (error: any) {
      dispatch({
        type: NotifyActionTypes.NOTIFY,
        payload: { errors: error.response.data.message },
      });
    }
  };
};

export const register = (data: IUser) => {
  return async (dispatch: Dispatch<UserAction | NotifyAction>) => {
    try {
      const response = await postAPI('auth/register', data);
      dispatch({ type: UserActionTypes.REGISTER, payload: response.data });
      dispatch({ type: NotifyActionTypes.NOTIFY, payload: { success: 'Успешная регистрация' } });
    } catch (error: any) {
      dispatch({
        type: NotifyActionTypes.NOTIFY,
        payload: { errors: error.response.data.message },
      });
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      destroyCookie(null, 'ozonaToken', null);
      dispatch({ type: UserActionTypes.LOGOUT });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProfile = (ctx: any) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const { ozonaToken } = parseCookies(ctx);
      const response = await getAPI('user/profile', ozonaToken);
      dispatch({ type: UserActionTypes.LOGIN, payload: response.data });
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
};
