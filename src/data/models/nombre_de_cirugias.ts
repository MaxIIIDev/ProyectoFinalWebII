import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { paciente_cirugias } from "./paciente_cirugias";



@Table
export class nombre_Cirugia extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_nombre_cirugia: number;

    @Column(DataType.STRING)
    declare nombre: string;

    @HasMany(()=> paciente_cirugias)
    declare paciente_cirugias: paciente_cirugias[]

}