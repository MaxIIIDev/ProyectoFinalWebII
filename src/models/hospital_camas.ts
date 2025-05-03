import { Table, Column, Model, DataType, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
import { admision } from './admision';
import { hospital_habitaciones } from './hospital_habitaciones';

@Table({
  tableName: 'hospital_camas',
  timestamps: false
})
export class hospital_camas extends Model<hospital_camas> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  })
  idCama!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: true
  })
  disponible?: number;

  @ForeignKey(() => hospital_habitaciones)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  idHabitacion?: number;

  @BelongsTo(() => hospital_habitaciones)
  hospitalHabitacion!: hospital_habitaciones;

  @HasMany(() => admision)
  admisiones!: admision[];
}
