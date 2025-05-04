import { AutoIncrement, Column, DataType, HasMany, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Hospital_habitaciones } from "./hospital_habitaciones";

@Table
export class Hospital_alas extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Ala: number;

    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare nombre:string;

    @NotNull
    @Column(DataType.INTEGER)
    declare cantidad_Habitaciones:number;

    @NotNull
    @Column(DataType.INTEGER)
    declare cantidad_Camas:number;

    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare unidad:string;

    @HasMany(()=> Hospital_habitaciones)
    declare habitaciones: Hospital_habitaciones[]

}
