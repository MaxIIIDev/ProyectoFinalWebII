import { AllowNull, AutoIncrement, Column, DataType, HasOne, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Admision } from "./admision";


@Table
export class prioridadDeAtencion extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.NUMBER)
    declare id_prioridad_de_atencion:number

    @AllowNull(false)
    @NotNull
    @Column(DataType.STRING)
    declare prioridad:string

    @HasOne(()=> Admision)
    declare admision: Admision


}
