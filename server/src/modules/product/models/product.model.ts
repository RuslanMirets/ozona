import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'Product' })
export class Product extends Model<Product> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price: number;

  @Column({ type: DataType.JSONB, allowNull: true })
  images: string;
}
