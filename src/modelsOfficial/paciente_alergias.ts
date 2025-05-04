import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Pacientes } from "./pacientes";
import { paciente_tratamientos } from "./paciente_tratamientos";

@Table
export class Paciente_Alergias extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Alergia:number;

    @NotNull
    @Column(DataType.STRING)
    declare nombre: string;

    @NotNull
    @Column(DataType.STRING)
    declare descripcion:string;

    @ForeignKey(() => Pacientes)
    @Column(DataType.INTEGER)
    declare id_paciente: number;

    @BelongsTo(()=> Pacientes)
    declare paciente: Pacientes

    //tratamiento
    @ForeignKey(() => paciente_tratamientos)
    @Column(DataType.INTEGER)
    declare id_tratamiento: number;

    @BelongsTo(() => paciente_tratamientos)
    declare tratamiento: paciente_tratamientos

}
