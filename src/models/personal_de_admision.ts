import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { usuarios } from './usuarios';

@Table({
  tableName: 'personal_de_admision',
  timestamps: false
})
export class personalDeAdmision extends Model<personalDeAdmision> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  })
  idPersonalDeAdmision!: number;

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
    allowNull: false
  })
  direccion!: string;

  @Column({
    type: DataType.STRING(5),
    allowNull: false
  })
  tipoSanguineo!: string;

  @ForeignKey(() => usuarios)
  @Column({ type: DataType.INTEGER, allowNull: false })
  idUsuario!: number;

  @BelongsTo(() => usuarios)
  usuario!: usuarios;
}
