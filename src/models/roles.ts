import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { usuarios } from './usuarios';

@Table({
  tableName: 'roles',
  timestamps: false
})
export class roles extends Model<roles> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  })
  idRol!: number;

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  nombre?: string;

  @HasMany(() => usuarios)
  usuarios!: usuarios[];
}
