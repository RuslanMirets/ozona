import { userSlice } from './../slices/user';
import { getAPI } from './../../utils/FetchData';
import { AppDispatch } from './../store';

export const getUsers = () => async (dispatch: AppDispatch) => {
  try {
    const response = await getAPI('user');
    dispatch(userSlice.actions.getUsers(response.data));
  } catch (error) {
    console.log(error);
  }
};
