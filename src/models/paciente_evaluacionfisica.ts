import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { enfermeros } from './enfermeros';
import { pacientes } from './pacientes';

@Table({
  tableName: 'paciente_evaluacionfisica',
  timestamps: false
})
export class pacienteEvaluacionFisica extends Model<pacienteEvaluacionFisica> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  })
  idEvaluacionFisica!: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  fecha!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  presionArterial!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  frecuenciaCardiaca!: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false
  })
  temperaturaCorporal!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  colorDePiel?: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  respuestaAEstimulos?: string;

  @ForeignKey(() => pacientes)
  @Column({ type: DataType.INTEGER, allowNull: true })
  idPaciente?: number;

  @BelongsTo(() => pacientes)
  paciente!: pacientes;

  @ForeignKey(() => enfermeros)
  @Column({ type: DataType.INTEGER, allowNull: true })
  idEnfermero?: number;

  @BelongsTo(() => enfermeros)
  enfermero!: enfermeros;
}
