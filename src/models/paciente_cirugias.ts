import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { medicos } from './medicos';
import { pacientes } from './pacientes';

@Table({
  tableName: 'paciente_cirugias',
  timestamps: false
})
export class pacienteCirugias extends Model<pacienteCirugias> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  })
  idCirugia!: number;

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
    type: DataType.STRING(250),
    allowNull: false
  })
  descripcion!: string;

  @ForeignKey(() => medicos)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  idMedico?: number;

  @BelongsTo(() => medicos)
  medico!: medicos;

  @ForeignKey(() => pacientes)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  idPaciente?: number;

  @BelongsTo(() => pacientes)
  paciente!: pacientes;
}
