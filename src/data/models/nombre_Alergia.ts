import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Paciente_Alergias } from "./Paciente_Alergias";


@Table({ tableName: "nombre_alergia" })
export class nombre_Alergia extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_nombre_alergia: number;

    @Column(DataType.STRING)
    declare nombre: string;

    @HasMany(()=> Paciente_Alergias)
    declare paciente_alergias: Paciente_Alergias[]

}