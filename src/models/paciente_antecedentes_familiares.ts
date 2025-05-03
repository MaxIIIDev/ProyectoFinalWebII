import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { pacientes } from './pacientes';

@Table({
  tableName: 'paciente_antecedentes_familiares',
  timestamps: false
})
export class paciente_antecedentes_familiares extends Model<paciente_antecedentes_familiares> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  })
  idAntecedenteFamiliar!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  nombreEnfermedad!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  detalles!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  lazoFamiliar!: string;

  @ForeignKey(() => pacientes)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  idPaciente?: number;

  @BelongsTo(() => pacientes)
  paciente!: pacientes;
}
