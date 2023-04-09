import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';
import { DataTypes, Optional } from 'sequelize';

interface StoreAttributes {
  id: string;
  name: string;
  url: string;
  address: string;
  phone: string;
  operational_time_start: string;
  operational_time_end: string;
}

interface StoreCreationAttributes extends Optional<StoreAttributes, 'id'> {}

@Table({
  modelName: 'Store',
  tableName: 'stores',
  timestamps: true,
  paranoid: false,
})
export class Store extends Model<StoreAttributes, StoreCreationAttributes> {
  @PrimaryKey
  @Column({ type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
  id!: string;

  @Column({ type: DataTypes.STRING })
  name!: string;

  @Column({ type: DataTypes.STRING })
  status!: string;
}
