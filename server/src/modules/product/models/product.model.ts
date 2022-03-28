import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'Product' })
export class Product extends Model<Product> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price: number;

  @Column({ type: DataType.STRING(1234), allowNull: false })
  description: string;

  @Column({ type: DataType.JSONB, allowNull: false })
  images: string[];

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  inStock: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  sold: number;
}
