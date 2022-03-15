import { DATABASE_CONNECTION, ORDER_MODEL } from 'src/core/constants';
import { Connection } from 'mongoose';
import { OrderSchema } from './schemas/order.schema';

export const orderProvider = [
  {
    provide: ORDER_MODEL,
    useFactory: (connection: Connection) => connection.model('Order', OrderSchema),
    inject: [DATABASE_CONNECTION],
  },
];
