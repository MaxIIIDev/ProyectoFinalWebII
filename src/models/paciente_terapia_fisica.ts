import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { pacientes } from './pacientes';
import { pacienteTratamientos } from './paciente_tratamientos';

@Table({
  tableName: 'paciente_terapia_fisica',
  timestamps: false
})
export class pacienteTerapiaFisica extends Model<pacienteTerapiaFisica> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  })
  idTerapiaFisica!: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  fecha!: string;

  @Column({
    type: DataType.STRING(250),
    allowNull: false
  })
  nombre!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  duracion!: number;

  @ForeignKey(() => pacientes)
  @Column({ type: DataType.INTEGER, allowNull: true })
  idPaciente?: number;

  @BelongsTo(() => pacientes)
  paciente!: pacientes;

  @ForeignKey(() => pacienteTratamientos)
  @Column({ type: DataType.INTEGER, allowNull: true })
  idTratamiento?: number;

  @BelongsTo(() => pacienteTratamientos)
  tratamiento!: pacienteTratamientos;
}
