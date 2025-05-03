import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { pacienteDiagnosticos } from './paciente_diagnosticos';
import { pacientes } from './pacientes';

@Table({
  tableName: 'paciente_pruebas_diagnosticas',
  timestamps: false
})
export class pacientePruebasDiagnosticas extends Model<pacientePruebasDiagnosticas> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  })
  idPruebaDiagnostica!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  nombre!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  resultado!: string;

  @ForeignKey(() => pacienteDiagnosticos)
  @Column({ type: DataType.INTEGER, allowNull: true })
  idDiagnostico?: number;

  @BelongsTo(() => pacienteDiagnosticos)
  diagnostico!: pacienteDiagnosticos;

  @ForeignKey(() => pacientes)
  @Column({ type: DataType.INTEGER, allowNull: true })
  idPaciente?: number;

  @BelongsTo(() => pacientes)
  paciente!: pacientes;
}
