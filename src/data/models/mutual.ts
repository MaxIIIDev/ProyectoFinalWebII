import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Paciente_seguro_medico } from "./paciente_seguro_medico";

@Table
export class Mutual extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_mutual: number;

    @Column(DataType.STRING)
    declare nombre: string;

    @HasMany(()=> Paciente_seguro_medico)
    declare paciente_seguro_medico: Paciente_seguro_medico[];
}