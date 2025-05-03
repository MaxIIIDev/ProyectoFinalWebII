import { AutoIncrement, Column, DataType, Default, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class Hospital_camas extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare idCama: number;

    @NotNull
    @Default(true)
    @Column(DataType.BOOLEAN)
    declare disponible: boolean;

}