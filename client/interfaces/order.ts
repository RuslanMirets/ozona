import { IProduct } from './product';
export interface IOrder {
  address: string;
  phone: string;
  cart: IProduct[];
}
