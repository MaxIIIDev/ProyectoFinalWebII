import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { pacienteSeguroMedico } from './paciente_seguromedico';
import { admision } from './admision';
import { paciente_alergias } from './paciente_alergias';
import { paciente_antecedentes_familiares } from './paciente_antecedentes_familiares';
import { pacienteCirugias } from './paciente_cirugias';
import { pacienteDiagnosticos } from './paciente_diagnosticos';
import { pacienteEvaluacionFisica } from './paciente_evaluacionfisica';
import { pacientePruebasDiagnosticas } from './paciente_pruebas_diagnosticas';
import { pacienteRecetas } from './paciente_recetas';
import { pacienteTerapiaFisica } from './paciente_terapia_fisica';
import { pacienteTratamientos } from './paciente_tratamientos';
import { turnos } from './turnos';

@Table({
  tableName: 'pacientes',
  timestamps: false
})
export class pacientes extends Model<pacientes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  })
  idPaciente!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  nombre!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  apellido!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true
  })
  dni!: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  fecha_nac!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  edad!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  peso?: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  genero!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  telefono!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  telefonoEmergencia?: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  direccion?: string;

  @ForeignKey(() => pacienteSeguroMedico)
  @Column({ type: DataType.INTEGER, allowNull: true })
  idSeguroMedico?: number;

  @BelongsTo(() => pacienteSeguroMedico)
  seguroMedico!: pacienteSeguroMedico;

  @Column({
    type: DataType.STRING(10),
    allowNull: true
  })
  tipoSanguineo?: string;

  @HasMany(() => admision)
  admisiones!: admision[];

  @HasMany(() => paciente_alergias)
  alergias!: paciente_alergias[];

  @HasMany(() => paciente_antecedentes_familiares)
  antecedentesFamiliares!: paciente_antecedentes_familiares[];

  @HasMany(() => pacienteCirugias)
  cirugias!: pacienteCirugias[];

  @HasMany(() => pacienteDiagnosticos)
  diagnosticos!: pacienteDiagnosticos[];

  @HasMany(() => pacienteEvaluacionFisica)
  evaluacionesFisicas!: pacienteEvaluacionFisica[];

  @HasMany(() => pacientePruebasDiagnosticas)
  pruebasDiagnosticas!: pacientePruebasDiagnosticas[];

  @HasMany(() => pacienteRecetas)
  recetas!: pacienteRecetas[];

  @HasMany(() => pacienteTerapiaFisica)
  terapiasFisicas!: pacienteTerapiaFisica[];

  @HasMany(() => pacienteTratamientos)
  tratamientos!: pacienteTratamientos[];

  @HasMany(() => turnos)
  turnos!: turnos[];
}
