import { Order } from './models/order.model';
import { ORDER_REPOSITORY } from './../../core/constants/index';

export const orderProvider = [{ provide: ORDER_REPOSITORY, useValue: Order }];
