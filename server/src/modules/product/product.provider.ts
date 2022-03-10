import { PRODUCT_MODEL } from './../../core/constants/index';
import { DATABASE_CONNECTION } from 'src/core/constants';
import { Connection } from 'mongoose';
import { ProductSchema } from './schemas/product.schema';

export const productProvider = [
  {
    provide: PRODUCT_MODEL,
    useFactory: (connection: Connection) => connection.model('Product', ProductSchema),
    inject: [DATABASE_CONNECTION],
  },
];
