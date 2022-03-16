import { IUser } from './../../interfaces/user';
import { parseCookies } from 'nookies';
import { userSlice } from './../slices/user';
import { patchAPI } from './../../utils/fetchData';
import { AppDispatch } from '..';
import { alertSlice } from '../slices/alert';

export const resetPassword = (dto: IUser) => async (dispatch: AppDispatch) => {
  try {
    const { ozonaToken } = parseCookies();
    const response = await patchAPI('user/resetPassword', dto, ozonaToken);
    // dispatch(userSlice.actions.resetPassword(response.data));

    console.log('');

    dispatch(alertSlice.actions.success('Пароль успешно изменен'));
  } catch (error: any) {
    // dispatch(alertSlice.actions.errors('Ошибка при изменения пароля'));
    dispatch(alertSlice.actions.errors(error.response.data.message));
  }
};
