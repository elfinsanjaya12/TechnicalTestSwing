import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';
import { DataTypes, Optional } from 'sequelize';

interface UploadAttributes {
  id: string;
  cloudinaryId: string;
  url: string;
}

interface UploadCreationAttributes extends Optional<UploadAttributes, 'id'> {}

@Table({
  modelName: 'Upload',
  tableName: 'uploads',
  timestamps: true,
  paranoid: false,
})
export class Upload extends Model<UploadAttributes, UploadCreationAttributes> {
  @PrimaryKey
  @Column({ type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
  id!: string;

  @Column({ type: DataTypes.STRING })
  cloudinaryId!: string;

  @Column({ type: DataTypes.STRING })
  url!: string;
}
