import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { hospital_alas } from './hospital_alas';
import { hospital_camas } from './hospital_camas';

@Table({
  tableName: 'hospital_habitaciones',
  timestamps: false
})
export class hospital_habitaciones extends Model<hospital_habitaciones> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  })
  idHabitacion!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true
  })
  nroHabitacion!: number;

  @ForeignKey(() => hospital_alas)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  idAla?: number;

  @BelongsTo(() => hospital_alas)
  hospitalAla!: hospital_alas;

  @HasMany(() => hospital_camas)
  hospitalCamas!: hospital_camas[];
}
