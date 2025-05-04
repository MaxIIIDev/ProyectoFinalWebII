import { AutoIncrement, Column, CreatedAt, DataType, HasMany, HasOne, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Paciente_Alergias } from "./paciente_alergias";
import { paciente_alergias } from "../models/paciente_alergias";
import { Paciente_Diagnosticos } from "./paciente_diagnosticos";

@Table
export class paciente_tratamientos extends Model{


    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_tratamiento: number;

    @NotNull
    @Column(DataType.STRING)
    declare tipo: string;

    @NotNull
    @Column(DataType.STRING)
    declare detalle: string;

    @NotNull
    @Column(DataType.DOUBLE)
    declare cantidad_suministrada: number;

    @CreatedAt
    @Column(DataType.DATE)
    declare fecha_de_inicio: Date

    @Column(DataType.DATE)
    declare fecha_de_fin: Date

    @HasMany(()=> Paciente_Alergias)
    declare alergias: paciente_alergias[]

    @HasOne(()=> Paciente_Diagnosticos)
    declare diagnostico: Paciente_Diagnosticos


}
