import { authSlice } from './../slices/auth';
import { userSlice } from './../slices/user';
import { getAPI } from './../../utils/FetchData';
import { AppDispatch } from './../store';
import { parseCookies } from 'nookies';

export const getUsers = () => async (dispatch: AppDispatch) => {
  try {
    const response = await getAPI('user');
    dispatch(userSlice.actions.getUsers(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const profile = () => async (dispatch: AppDispatch) => {
  try {
    const { ozonaToken } = parseCookies();
    const response = await getAPI('user/profile', ozonaToken);
    dispatch(userSlice.actions.profile(response.data));
  } catch (error) {
    console.log('Profile error');
  }
};
