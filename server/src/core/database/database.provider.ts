import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from '../constants';

export const databaseProvider = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://admin:admin123@cluster0.68aoi.mongodb.net/ozona?retryWrites=true&w=majority',
      ),
  },
];
