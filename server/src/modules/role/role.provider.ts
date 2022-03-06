import { RoleSchema } from './schemas/role.schema';
import { DATABASE_CONNECTION, ROLE_MODEL } from 'src/core/constants';
import { Connection } from 'mongoose';

export const roleProvider = [
  {
    provide: ROLE_MODEL,
    useFactory: (connection: Connection) => connection.model('Role', RoleSchema),
    inject: [DATABASE_CONNECTION],
  },
];
