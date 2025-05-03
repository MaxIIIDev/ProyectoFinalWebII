import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasOne } from 'sequelize-typescript';
import { roles } from './roles';
import { enfermeros } from './enfermeros';
import { medicos } from './medicos';
import { personalDeAdmision } from './personal_de_admision';

@Table({
  tableName: 'usuarios',
  timestamps: false
})
export class usuarios extends Model<usuarios> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  })
  idUsuario!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true
  })
  email!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  password_hash!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: 1
  })
  activo?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0
  })
  intentos_fallidos?: number;

  @ForeignKey(() => roles)
  @Column({ type: DataType.INTEGER, allowNull: true })
  idRol?: number;

  @BelongsTo(() => roles)
  rol!: roles;

  @HasOne(() => enfermeros)
  enfermero!: enfermeros;

  @HasOne(() => medicos)
  medico!: medicos;

  @HasOne(() => personalDeAdmision)
  personalDeAdmision!: personalDeAdmision;
}
