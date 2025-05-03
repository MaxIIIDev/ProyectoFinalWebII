import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { enfermeros } from './enfermeros';
import { medicamentos } from './medicamentos';
import { paciente_alergias } from './paciente_alergias';
import { pacienteDiagnosticos } from './paciente_diagnosticos';
import { pacienteTerapiaFisica } from './paciente_terapia_fisica';
import { pacientes } from './pacientes';

@Table({
  tableName: 'paciente_tratamientos',
  timestamps: false
})
export class pacienteTratamientos extends Model<pacienteTratamientos> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  })
  idTratamiento!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  tipo!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  detalle!: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false
  })
  cantidadSuministrada!: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  fechaDeInicio!: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true
  })
  fechaDeFin?: string;

  @ForeignKey(() => pacientes)
  @Column({ type: DataType.INTEGER, allowNull: true })
  idPaciente?: number;

  @BelongsTo(() => pacientes)
  paciente!: pacientes;

  @ForeignKey(() => medicamentos)
  @Column({ type: DataType.INTEGER, allowNull: true })
  idMedicamento?: number;

  @BelongsTo(() => medicamentos)
  medicamento!: medicamentos;

  @ForeignKey(() => enfermeros)
  @Column({ type: DataType.INTEGER, allowNull: true })
  idEnfermero?: number;

  @BelongsTo(() => enfermeros)
  enfermero!: enfermeros;

  @HasMany(() => paciente_alergias)
  alergias!: paciente_alergias[];

  @HasMany(() => pacienteDiagnosticos)
  diagnosticos!: pacienteDiagnosticos[];

  @HasMany(() => pacienteTerapiaFisica)
  terapiasFisicas!: pacienteTerapiaFisica[];
}
