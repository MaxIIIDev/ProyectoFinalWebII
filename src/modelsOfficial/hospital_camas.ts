import { AutoIncrement, BelongsTo, Column, DataType, Default, ForeignKey, HasOne, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Admision } from "./admision";
import { Hospital_habitaciones } from "./hospital_habitaciones";

@Table
export class Hospital_camas extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Cama: number;

    @NotNull
    @Default(true)
    @Column(DataType.BOOLEAN)
    declare disponible: boolean;

    @HasOne(() => Admision)
    declare admision: Admision

    @ForeignKey(()=> Hospital_habitaciones)
    @Column(DataType.INTEGER)
    declare id_habitacion: number;

    @BelongsTo(() => Hospital_habitaciones)
    declare habitacion: Hospital_habitaciones

}