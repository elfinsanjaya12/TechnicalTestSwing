import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';
import { DataTypes, Optional } from 'sequelize';

interface StoreAttributes {
  id: string;
  name: string;
  url: string;
  address: string;
  phone: string;
  operationalTimeStart: number;
  operationalTimeEnd: number;
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
  url!: string;

  @Column({ type: DataTypes.STRING })
  address!: string;

  @Column({ type: DataTypes.STRING })
  phone!: string;

  @Column({ type: DataTypes.INTEGER })
  operationalTimeStart!: number;

  @Column({ type: DataTypes.INTEGER })
  operationalTimeEnd!: number;
}
