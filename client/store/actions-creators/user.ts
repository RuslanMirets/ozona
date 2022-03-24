import { getAPI } from './../../utils/fetchData';
import { Dispatch } from 'react';
import { UserAction, UserActionTypes } from './../../types/user';

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
