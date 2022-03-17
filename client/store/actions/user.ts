import { IUser } from './../../interfaces/user';
import { parseCookies } from 'nookies';
import { patchAPI } from './../../utils/fetchData';
import { AppDispatch } from '..';
import { alertSlice } from '../slices/alert';

export const resetPassword = (dto: IUser) => async (dispatch: AppDispatch) => {
  try {
    const { ozonaToken } = parseCookies();
    await patchAPI('user/reset-password', dto, ozonaToken);
    dispatch(alertSlice.actions.success('Пароль успешно изменен'));
  } catch (error: any) {
    dispatch(alertSlice.actions.errors(error.response.data.message));
  }
};
