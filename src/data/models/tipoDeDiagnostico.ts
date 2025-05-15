import { AllowNull, AutoIncrement, Column, DataType, HasMany, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Paciente_Diagnosticos } from "./paciente_diagnosticos";

@Table
export class Tipo_De_Diagnostico extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_tipo_de_diagnostico: number;

    @AllowNull(false)
    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare nombre:string;

    @AllowNull(false)
    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare descripcion:string;

    @HasMany(()=> Paciente_Diagnosticos)
    declare paciente_diagnosticos: Paciente_Diagnosticos[]
}