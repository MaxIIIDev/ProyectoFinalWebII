import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { pacienteRecetas } from './paciente_recetas';
import { pacienteTratamientos } from './paciente_tratamientos';

@Table({
  tableName: 'medicamentos',
  timestamps: false
})
export class medicamentos extends Model<medicamentos> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  })
  idMedicamento!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  nombre!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  tipo!: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false
  })
  dosisRecomendada!: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false
  })
  cantidadContenidaMl!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true
  })
  codigo!: number;

  @HasMany(() => pacienteRecetas)
  pacienteRecetas!: pacienteRecetas[];

  @HasMany(() => pacienteTratamientos)
  pacienteTratamientos!: pacienteTratamientos[];
}
