import { AutoIncrement, Column, DataType, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class Hospital_alas extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare idAla: number;

    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare nombre:string;

    @NotNull
    @Column(DataType.INTEGER)
    declare cantidadHabitaciones:number;

    @NotNull
    @Column(DataType.INTEGER)
    declare cantidadCamas:number;

    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare unidad:string;

}
