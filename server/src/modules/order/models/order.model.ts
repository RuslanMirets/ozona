import { UserOrder } from './user-order';
import { Table, Model, Column, DataType, BelongsToMany } from 'sequelize-typescript';
import { User } from 'src/modules/user/models/user.model';
import { CartDataDto } from '../dto/cart-data.dto';

@Table({ tableName: 'Order' })
export class Order extends Model<Order> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  address: string;

  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;

  @Column({ type: DataType.JSONB, allowNull: false })
  cart: CartDataDto[];

  @Column({ type: DataType.FLOAT, allowNull: false })
  total: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  delivered: boolean;

  @BelongsToMany(() => User, () => UserOrder)
  user: User[];
}
