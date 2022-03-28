import { Table, Model, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/modules/user/models/user.model';
import { Order } from './order.model';

@Table({ tableName: 'UserOrder', createdAt: false, updatedAt: false })
export class UserOrder extends Model<UserOrder> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER })
  orderId: number;
}
