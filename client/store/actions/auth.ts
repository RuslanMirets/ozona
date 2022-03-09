import { AppDispatch } from '..';
import { IUser } from '../../interfaces/user';
import { postAPI } from '../../utils/fetchData';
import { alertSlice } from '../slices/alert';
import { authSlice } from '../slices/auth';

export const register = (userData: IUser) => async (dispatch: AppDispatch) => {
  try {
    const response = await postAPI('auth/register', userData);
    dispatch(authSlice.actions.register(response.data));
    dispatch(alertSlice.actions.success('Успешная регистрация'));
  } catch (error: any) {
    dispatch(alertSlice.actions.errors(error.response.data.message));
  }
};
