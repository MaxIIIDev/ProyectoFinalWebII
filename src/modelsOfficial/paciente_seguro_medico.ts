import { AllowNull, AutoIncrement, Column, DataType, Default, HasOne, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Pacientes } from "./pacientes";


@Table
export class Paciente_seguro_medico extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_seguro_medico: number;

    @AllowNull(false)
    @NotNull
    @Column(DataType.INTEGER)
    declare numero: number;

    @Default(true)
    @Column(DataType.BOOLEAN)
    declare estado: boolean;

    @Length({min:10,max:100})
    @Column(DataType.STRING)
    declare categoria: string;

    @HasOne(()=> Pacientes)
    declare paciente: Pacientes

}