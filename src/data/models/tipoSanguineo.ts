import { AutoIncrement, Column, DataType, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Pacientes } from "./pacientes";



@Table
export class TipoSanguineo extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_tipo_sanguineo: number;

    @Column(DataType.STRING)
    declare nombre: string;

    @HasMany(()=> Pacientes)
    declare pacientes: Pacientes[]

}