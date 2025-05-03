import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { pacienteTratamientos } from './paciente_tratamientos';
import { pacientes } from './pacientes';

@Table({
  tableName: 'paciente_alergias',
  timestamps: false
})
export class paciente_alergias extends Model<paciente_alergias> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  })
  idAlergia!: number;

  @Column({
    type: DataType.STRING(200),
    allowNull: false
  })
  nombre!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  descripcion!: string;

  @ForeignKey(() => pacientes)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  idPaciente?: number;

  @BelongsTo(() => pacientes)
  paciente!: pacientes;

  @ForeignKey(() => pacienteTratamientos)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  idTratamiento?: number;

  @BelongsTo(() => pacienteTratamientos)
  tratamiento!: pacienteTratamientos;
}
