import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { medicos } from './medicos';
import { pacientes } from './pacientes';

@Table({
  tableName: 'turnos',
  timestamps: false
})
export class turnos extends Model<turnos> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  })
  idTurno!: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  fecha!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  horario!: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false
  })
  motivo!: string;

  @ForeignKey(() => pacientes)
  @Column({ type: DataType.INTEGER, allowNull: true })
  idPaciente?: number;

  @BelongsTo(() => pacientes)
  paciente!: pacientes;

  @ForeignKey(() => medicos)
  @Column({ type: DataType.INTEGER, allowNull: true })
  idMedico?: number;

  @BelongsTo(() => medicos)
  medico!: medicos;
}
