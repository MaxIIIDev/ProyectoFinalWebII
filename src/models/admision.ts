import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { hospital_camas } from './hospital_camas';
import { pacientes } from './pacientes';

@Table({
  tableName: 'admision',
  timestamps: false
})
export class admision extends Model<admision> {
  
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  })
  idAdmision!: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  fechaDeAdmision!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  tipoDeAdmision!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  estado!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  motivoDeInternacion!: string;

  @ForeignKey(() => pacientes)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  idPaciente?: number;

  @BelongsTo(() => pacientes)
  paciente!: pacientes;

  @ForeignKey(() => hospital_camas)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  idCama?: number;

  @BelongsTo(() => hospital_camas)
  hospitalCama!: hospital_camas}