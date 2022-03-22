import { UUIDV4 } from 'sequelize';
import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'Role' })
export class Role extends Model<Role> {
  @Column({ type: DataType.UUID, defaultValue: UUIDV4, unique: true, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;
}
