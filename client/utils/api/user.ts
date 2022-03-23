import { IUser } from '../interfaces/user';
import { AxiosInstance } from 'axios';

export const UserApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<IUser[]>('/user');
    return data;
  },
});
