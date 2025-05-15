import { AutoIncrement, Column, DataType, HasOne, Length, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Admision } from "./admision";


@Table
export class motivo_De_Internacion extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_motivo_de_Internacion:number

    @Unique
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare motivo: string

    @HasOne(()=> Admision)
    declare admision: Admision

}