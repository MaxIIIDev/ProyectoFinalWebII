import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Pacientes } from "./pacientes";
import { paciente_tratamientos } from "./paciente_tratamientos";



@Table
export class paciente_terapia_fisica extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_terapia_fisica: number;

    @AllowNull(false)
    @NotNull
    @Column(DataType.DATE)
    declare fecha:Date;

    @AllowNull(false)
    @NotNull
    @Length({min:10,max:255})
    @Column(DataType.STRING)
    declare nombre:string;

    @AllowNull(false)
    @NotNull
    @Column(DataType.INTEGER)
    declare duracion: number;

    @ForeignKey(()=> Pacientes)
    @Column(DataType.INTEGER)
    declare id_paciente:number;

    @BelongsTo(()=> Pacientes)
    declare paciente: Pacientes


    // @ForeignKey(()=> paciente_tratamientos)
    // @Column(DataType.INTEGER)
    // declare id_tratamiento: number
    
    // @BelongsTo(()=> paciente_tratamientos)
    // declare tratamiento: paciente_tratamientos
}