import { IRole } from './role';

export interface IUser {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  avatar?: string;
  role?: IRole[];
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
  UPDATE_NAME = 'UPDATE_NAME',
  UPDATE_AVATAR = 'UPDATE_AVATAR',
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
interface UpdateNameAction {
  type: UserActionTypes.UPDATE_NAME;
  payload: string;
}
interface UpdateAvatarAction {
  type: UserActionTypes.UPDATE_AVATAR;
  payload: string;
}

export type UserAction =
  | FetchUsersAction
  | LoginAction
  | RegisterAction
  | LogoutAction
  | UpdateNameAction
  | UpdateAvatarAction;
