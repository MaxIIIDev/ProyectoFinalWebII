import { AutoIncrement, Column, DataType, Default, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class Hospital_habitaciones extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Habitacion: number;

    @NotNull
    @Column(DataType.INTEGER)
    declare nro_Habitacion:number;


}

