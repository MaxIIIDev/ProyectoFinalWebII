import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Paciente_Cirugias } from "./Paciente_Cirugias";



@Table({ tableName: "nombre_cirugia" })
export class nombre_Cirugia extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_nombre_cirugia: number;

    @Column(DataType.STRING)
    declare nombre: string;

    @HasMany(()=> Paciente_Cirugias)
    declare paciente_cirugias: Paciente_Cirugias[]

}