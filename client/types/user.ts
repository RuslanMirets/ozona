import { IRole } from './role';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  avatar: string;
  role: IRole[];
}

export interface UserState {
  users: IUser[];
}

export enum UserActionTypes {
  FETCH_USERS = 'FETCH_USERS',
}

interface FetchUsersAction {
  type: UserActionTypes.FETCH_USERS;
  payload: IUser[];
}

export type UserAction = FetchUsersAction;
