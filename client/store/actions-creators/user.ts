import { NotifyAction, NotifyActionTypes } from './../../types/notify';
import { getAPI, patchAPI, postAPI } from './../../utils/fetchData';
import { Dispatch } from 'react';
import { UserAction, UserActionTypes, IUser } from './../../types/user';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import axios from 'axios';

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
      destroyCookie(null, 'ozonaToken');
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

export const resetPassword = (password: object) => {
  return async (dispatch: Dispatch<UserAction | NotifyAction>) => {
    try {
      const { ozonaToken } = parseCookies();
      await patchAPI('user/reset-password', password, ozonaToken);
      dispatch({ type: NotifyActionTypes.NOTIFY, payload: { success: 'Пароль успешно изменен' } });
    } catch (error: any) {
      dispatch({
        type: NotifyActionTypes.NOTIFY,
        payload: { errors: error.response.data.message },
      });
    }
  };
};

export const updateName = (name: object) => {
  return async (dispatch: Dispatch<UserAction | NotifyAction>) => {
    try {
      const { ozonaToken } = parseCookies();
      const response = await patchAPI('user/update-name', name, ozonaToken);
      dispatch({ type: UserActionTypes.UPDATE_NAME, payload: response.data.name });
      dispatch({ type: NotifyActionTypes.NOTIFY, payload: { success: 'Имя обновлено' } });
    } catch (error: any) {
      dispatch({
        type: NotifyActionTypes.NOTIFY,
        payload: { errors: 'Ошибка при изменении имени' },
      });
    }
  };
};

interface UploadImageReturnProps {
  filename: string;
}

export const uploadAvatar = (image: File): Promise<UploadImageReturnProps> => {
  //@ts-ignore
  return async (dispatch: Dispatch<UserAction | NotifyAction>) => {
    try {
      const formData = new FormData();
      formData.append('avatar', image);

      const { ozonaToken } = parseCookies();

      const { data } = await axios.patch('http://localhost:5000/user/update-avatar', formData, {
        headers: {
          Authorization: `Bearer ${ozonaToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch({ type: UserActionTypes.UPDATE_AVATAR, payload: data.avatar });
      return data;
    } catch (error: any) {
      dispatch({
        type: NotifyActionTypes.NOTIFY,
        payload: { errors: 'Ошибка при изменении аватара' },
      });
    }
  };
};
