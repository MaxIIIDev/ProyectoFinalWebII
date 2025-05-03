import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { medicos } from './medicos';
import { pacientes } from './pacientes';
import { pacientePruebasDiagnosticas } from './paciente_pruebas_diagnosticas';
import { pacienteTratamientos } from './paciente_tratamientos';

@Table({
  tableName: 'paciente_diagnosticos',
  timestamps: false
})
export class pacienteDiagnosticos extends Model<pacienteDiagnosticos> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  })
  idDiagnostico!: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  fecha!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  nombre!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  sintomas!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  detalles?: string;

  @ForeignKey(() => medicos)
  @Column({ type: DataType.INTEGER, allowNull: true })
  idMedico?: number;

  @BelongsTo(() => medicos)
  medico!: medicos;

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

  @HasMany(() => pacientePruebasDiagnosticas)
  pruebasDiagnosticas!: pacientePruebasDiagnosticas[];
}
