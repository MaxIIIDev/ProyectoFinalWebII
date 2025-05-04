import { AutoIncrement, Column, DataType, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";


@Table
export class Turnos extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_turno: number

    @NotNull
    @Column(DataType.DATE)
    declare fecha: Date;

    @NotNull
    @Column(DataType.DATE)
    declare horario:Date;

    @NotNull
    @Length({min:30,max:255})
    @Column(DataType.STRING)
    declare motivo: string


}