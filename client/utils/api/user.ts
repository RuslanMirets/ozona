import { IUser } from '../interfaces/user';
import { AxiosInstance } from 'axios';

export const UserApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<IUser[]>('/user');
    return data;
  },

  async login(userData: IUser) {
    const { data } = await instance.post<IUser>('/auth/login', userData);
    return data;
  },

  async getProfile() {
    const { data } = await instance.get<IUser>('/user/profile');
    return data;
  },
});
