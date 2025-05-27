import { AutoIncrement, Column, DataType, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Pacientes } from "./Pacientes";



@Table({ tableName: "tipo_sanguineo" })
export class Tipo_Sanguineo extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_tipo_sanguineo: number;

    @Column(DataType.STRING)
    declare nombre: string;

    @HasMany(()=> Pacientes)
    declare pacientes: Pacientes[]

}