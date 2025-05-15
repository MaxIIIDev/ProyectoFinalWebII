import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { paciente_tratamientos } from "./paciente_tratamientos";


@Table
export class Tipo_De_tratamiento extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Tipo_De_Tratamiento:number;

    @Column(DataType.STRING)
    declare nombre:string;

    @HasMany(()=> paciente_tratamientos)
    declare paciente_tratamientos: paciente_tratamientos[]

}