import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { medicamentos } from './medicamentos';
import { medicos } from './medicos';
import { pacientes } from './pacientes';

@Table({
  tableName: 'paciente_recetas',
  timestamps: false
})
export class pacienteRecetas extends Model<pacienteRecetas> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  })
  idReceta!: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  fecha!: string;

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

  @ForeignKey(() => medicamentos)
  @Column({ type: DataType.INTEGER, allowNull: true })
  idMedicamento?: number;

  @BelongsTo(() => medicamentos)
  medicamento!: medicamentos;
}
