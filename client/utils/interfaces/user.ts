import { IRole } from './role';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  role: IRole[];
  token: string;
}
