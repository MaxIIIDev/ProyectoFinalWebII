import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Paciente_seguro_medico } from "./Paciente_seguro_medico";

@Table({ tableName: "mutuales" })
export class Mutuales extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_mutual: number;

    @Column(DataType.STRING)
    declare nombre: string;

    @HasMany(()=> Paciente_seguro_medico)
    declare paciente_seguro_medico: Paciente_seguro_medico[];
}