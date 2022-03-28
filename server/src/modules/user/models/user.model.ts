import { UserOrder } from './../../order/models/user-order';
import { BelongsToMany, Table, Model, Column, DataType } from 'sequelize-typescript';
import { Order } from 'src/modules/order/models/order.model';
import { Role } from 'src/modules/role/models/role.model';
import { UserRole } from 'src/modules/role/models/user-role.model';

@Table({ tableName: 'User' })
export class User extends Model<User> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @BelongsToMany(() => Role, () => UserRole)
  role: Role[];

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: '' })
  avatar: string;

  @BelongsToMany(() => Order, () => UserOrder)
  order: Order[];
}
