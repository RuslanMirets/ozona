import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'Upload' })
export class Upload extends Model<Upload> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
}
