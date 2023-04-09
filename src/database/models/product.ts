import {
  Table,
  Column,
  Model,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { DataTypes, Optional } from 'sequelize';
import { Store } from './store';

interface ProductAttributes {
  id: string;
  file: string;
  title: string;
  level: string;
  reviews?: string;
  typeCourseId: string;
  categoryId: string;
  status: string;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

@Table({
  modelName: 'Product',
  tableName: 'Products',
  timestamps: true,
  paranoid: false,
})
export class Product extends Model<
  ProductAttributes,
  ProductCreationAttributes
> {
  @PrimaryKey
  @Column({ type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
  id!: string;

  @Column({ type: DataTypes.STRING })
  file!: string;

  @Column({ type: DataTypes.STRING })
  title!: string;

  @Column({ type: DataTypes.STRING })
  level!: string;

  @Column({ type: DataTypes.STRING })
  reviews!: string;

  @Column({ type: DataTypes.STRING })
  status!: string;

  // relation
  @ForeignKey(() => Store)
  @Column({ type: DataTypes.UUID })
  storeId!: string;

  @BelongsTo(() => Store, 'storeId')
  store!: Store;
}
