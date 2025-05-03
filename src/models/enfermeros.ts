import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { pacienteEvaluacionFisica } from './paciente_evaluacionfisica';
import { pacienteTratamientos } from './paciente_tratamientos';
import { usuarios } from './usuarios';

@Table({
  tableName: 'enfermeros',
  timestamps: false
})
export class enfermeros extends Model<enfermeros> {
  
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  })
  idEnfermero!: number;

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
    type: DataType.DOUBLE,
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
    type: DataType.STRING(200),
    allowNull: true
  })
  direccion?: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true
  })
  especialidad?: string;

  @ForeignKey(() => usuarios)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  idUsuario!: number;

  @BelongsTo(() => usuarios)
  usuario!: usuarios;

  @HasMany(() => pacienteEvaluacionFisica)
  pacienteEvaluacionesFisicas!: pacienteEvaluacionFisica[];

  @HasMany(() => pacienteTratamientos)
  pacienteTratamientos!: pacienteTratamientos[];
}
