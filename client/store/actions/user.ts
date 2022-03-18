import { parseCookies } from 'nookies';
import { patchAPI } from './../../utils/fetchData';
import { AppDispatch } from '..';
import { alertSlice } from '../slices/alert';

export const resetPassword = (password: object) => async (dispatch: AppDispatch) => {
  try {
    const { ozonaToken } = parseCookies();
    await patchAPI('user/reset-password', password, ozonaToken);
    dispatch(alertSlice.actions.success('Пароль успешно изменен'));
  } catch (error: any) {
    dispatch(alertSlice.actions.errors(error.response.data.message));
  }
};

export const updateName = (name: object) => async (dispatch: AppDispatch) => {
  try {
    const { ozonaToken } = parseCookies();
    await patchAPI('user/update-name', name, ozonaToken);
    dispatch(alertSlice.actions.success('Имя обновлено'));
  } catch (error: any) {
    dispatch(alertSlice.actions.errors(error.response.data.message));
  }
};
