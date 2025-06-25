import { AllowNull, AutoIncrement, Column, DataType, HasOne, Length, Model, NotNull, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Admision } from "./Admision";


@Table({ tableName: "tipo_de_admision" })
export class tipo_De_Admision extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_tipo_de_admision:number;

   
    @AllowNull(false)
    @NotNull
    @Unique
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare tipo:string

    @HasOne(()=> Admision)
    declare admision: string

}