import { getAPI, postAPI } from './../../utils/fetchData';
import { Dispatch } from 'react';
import { UserAction, UserActionTypes, IUser } from './../../types/user';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

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
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await postAPI('auth/login', data);
      setCookie(null, 'ozonaToken', response.data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      dispatch({ type: UserActionTypes.LOGIN, payload: response.data });
    } catch (error) {
      console.log(error);
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
