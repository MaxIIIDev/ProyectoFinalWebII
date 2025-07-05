import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Sintomas } from "./Sintomas";

@Table({ tableName: "nombre_sintoma" })
export class Nombre_Sintoma extends Model{
    
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    declare id_Nombre_Sintoma: number

    @Column(DataType.STRING)
    declare nombre: string

    @HasMany(()=> Sintomas)
    declare sintomas: Sintomas[]

}
