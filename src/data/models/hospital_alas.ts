import { AllowNull, AutoIncrement, Column, DataType, HasMany, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Hospital_habitaciones } from "./Hospital_habitaciones";

@Table({ tableName: "hospital_alas" })
export class Hospital_alas extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Ala: number;

    @AllowNull(false)
    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare nombre:string;

    @AllowNull(false)
    @NotNull
    @Column(DataType.INTEGER)
    declare cantidad_Habitaciones:number;


    @AllowNull(false)
    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare unidad:string;

    @HasMany(()=> Hospital_habitaciones)
    declare habitaciones: Hospital_habitaciones[]

}
