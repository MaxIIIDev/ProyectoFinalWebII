import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Admision } from "./Admision";
import { Paciente_Diagnosticos } from "./Paciente_Diagnosticos";
import { Nombre_Sintoma } from "./nombre_sintoma";


@Table({ tableName: "sintomas" })
export class Sintomas extends Model{

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    declare id_Sintoma: number


    @ForeignKey(()=> Nombre_Sintoma)
    @Column(DataType.INTEGER)
    declare id_Nombre_Sintoma: number

    @BelongsTo(()=> Nombre_Sintoma)
    declare nombre_sintoma: Nombre_Sintoma

    @ForeignKey(()=> Admision)
    @Column(DataType.INTEGER)
    declare id_Admision: number

    @BelongsTo(()=> Admision)
    declare admision: Admision

    

}