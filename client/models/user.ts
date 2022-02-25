import { IRole } from './role';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  role: IRole[];
}
