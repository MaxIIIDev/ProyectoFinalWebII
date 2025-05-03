import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { hospital_habitaciones } from './hospital_habitaciones';

@Table({
  tableName: 'hospital_alas',
  timestamps: false
})
export class hospital_alas extends Model<hospital_alas> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  })
  idAla!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  nombre!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  piso!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  cantidadHabitaciones!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  cantidadCamas!: number;

  @Column({
    type: DataType.STRING(200),
    allowNull: false
  })
  unidad!: string;

  @HasMany(() => hospital_habitaciones)
  hospitalHabitaciones!: hospital_habitaciones[];
}
