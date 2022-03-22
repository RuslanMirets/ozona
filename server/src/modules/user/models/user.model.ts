import { UUIDV4 } from 'sequelize';
import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'User' })
export class User extends Model<User> {
  @Column({ type: DataType.UUID, defaultValue: UUIDV4, unique: true, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
}
