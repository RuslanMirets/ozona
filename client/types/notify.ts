export interface INotify {
  success?: string | string[];
  errors?: string | string[];
}

export interface NotifyState {
  notify: INotify | null;
}

export enum NotifyActionTypes {
  NOTIFY = 'NOTIFY',
}

interface GetNotifyAction {
  type: NotifyActionTypes.NOTIFY;
  payload: INotify;
}

export type NotifyAction = GetNotifyAction;
