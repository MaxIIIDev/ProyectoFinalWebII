import { Table, Column, Model, DataType, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
import { pacienteCirugias } from './paciente_cirugias';
import { pacienteDiagnosticos } from './paciente_diagnosticos';
import { pacienteRecetas } from './paciente_recetas';
import { turnos } from './turnos';
import { usuarios } from './usuarios';

@Table({
  tableName: 'medicos',
  timestamps: false
})
export class medicos extends Model<medicos> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  })
  idMedico!: number;

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
    allowNull: false
  })
  especialidad!: string;

  @ForeignKey(() => usuarios)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  idUsuario!: number;

  @BelongsTo(() => usuarios)
  usuario!: usuarios;

  @HasMany(() => pacienteCirugias)
  pacienteCirugias!: pacienteCirugias[];

  @HasMany(() => pacienteDiagnosticos)
  pacienteDiagnosticos!: pacienteDiagnosticos[];

  @HasMany(() => pacienteRecetas)
  pacienteRecetas!: pacienteRecetas[];

  @HasMany(() => turnos)
  turnos!: turnos[];
}
