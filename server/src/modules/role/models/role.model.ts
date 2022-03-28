import { Table, Model, Column, DataType, BelongsToMany } from 'sequelize-typescript';
import { User } from 'src/modules/user/models/user.model';
import { UserRole } from './user-role.model';

@Table({ tableName: 'Role' })
export class Role extends Model<Role> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => User, () => UserRole)
  user: User[];
}
