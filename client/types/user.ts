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
  userData: IUser | null;
  registerData: IUser | null;
}

export enum UserActionTypes {
  FETCH_USERS = 'FETCH_USERS',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

interface FetchUsersAction {
  type: UserActionTypes.FETCH_USERS;
  payload: IUser[];
}
interface LoginAction {
  type: UserActionTypes.LOGIN;
  payload: IUser;
}
interface RegisterAction {
  type: UserActionTypes.REGISTER;
  payload: IUser;
}
interface LogoutAction {
  type: UserActionTypes.LOGOUT;
}

export type UserAction = FetchUsersAction | LoginAction | RegisterAction | LogoutAction;
