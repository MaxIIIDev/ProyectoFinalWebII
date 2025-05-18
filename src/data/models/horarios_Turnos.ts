import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Turnos } from "./turnos";

@Table
export class horarios_Turnos extends Model{

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    declare id_horario_turno: number;
    @Column(DataType.STRING)
    declare hora: string;

    @HasMany(() => Turnos)
    declare turnos: Turnos[];


}