import { UUIDV4 } from 'sequelize';
import { Table, Model, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/modules/user/models/user.model';
import { Role } from './role.model';

@Table({ tableName: 'UserRole', createdAt: false, updatedAt: false })
export class UserRole extends Model<UserRole> {
  @Column({ type: DataType.UUID, defaultValue: UUIDV4, unique: true, primaryKey: true })
  id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @ForeignKey(() => Role)
  @Column({ type: DataType.UUID })
  roleId: string;
}
