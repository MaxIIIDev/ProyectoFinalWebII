import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { pacientes } from './pacientes';

@Table({
  tableName: 'paciente_seguromedico',
  timestamps: false
})
export class pacienteSeguroMedico extends Model<pacienteSeguroMedico> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  })
  idSeguroMedico!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true
  })
  numero!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: 1
  })
  estado?: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  categoria!: string;

  @HasMany(() => pacientes)
  pacientes!: pacientes[];
}
