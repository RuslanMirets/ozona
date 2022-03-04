import { DATABASE_CONNECTION, USER_MODEL } from './../../core/constants/index';
import { Connection } from 'mongoose';
import { UserSchema } from './schemas/user.schema';

export const userProvider = [
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: [DATABASE_CONNECTION],
  },
];
