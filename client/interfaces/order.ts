import { IUser } from './user';
import { IProduct } from './product';
export interface IOrder {
  _id: string;
  address: string;
  phone: string;
  cart: IProduct[];
  createdAt: Date;
  updatedAt: Date;
  total: number;
  delivered: boolean;
  user: IUser;
}
