import { USER_MODEL, DATABASE_CONNECTION } from 'src/core/constants';
import { Connection } from 'mongoose';
import { UserSchema } from './schemas/user.schema';

export const userProvider = [
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: [DATABASE_CONNECTION],
  },
];
