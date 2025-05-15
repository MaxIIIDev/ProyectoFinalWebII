import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Admision } from "./admision";
import { Paciente_Diagnosticos } from "./paciente_diagnosticos";


@Table
export class Sintomas extends Model{

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    declare id_Sintoma: number

    @Unique
    @Column(DataType.STRING)
    declare nombre: string

    @ForeignKey(()=> Admision)
    @Column(DataType.INTEGER)
    declare id_Admision: number

    @BelongsTo(()=> Admision)
    declare admision: Admision

    @ForeignKey(()=> Paciente_Diagnosticos)
    @Column(DataType.INTEGER)
    declare id_Paciente_Diagnosticos:number

    @BelongsTo(()=> Paciente_Diagnosticos)
    declare Paciente_Diagnosticos: Paciente_Diagnosticos

}