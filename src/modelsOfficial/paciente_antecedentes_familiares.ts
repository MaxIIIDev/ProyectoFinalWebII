import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Pacientes } from "./pacientes";



@Table

export class Paciente_antecedentes_familiares extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Antecedente_Familiar: number;

    @NotNull
    @Length({min:10,max:255})
    @Column(DataType.STRING)
    declare nombre_Enfermedad:string;
    
    @NotNull
    @Length({min:10,max:255})
    @Column(DataType.STRING)
    declare detalles:string;

    
    @NotNull
    @Length({min:10,max:100})
    @Column(DataType.STRING)
    declare lazo_familiar:string;

    @ForeignKey(()=> Pacientes)
    @Column(DataType.INTEGER)
    declare id_Paciente: number

    @BelongsTo(()=> Pacientes)
    declare paciente: Pacientes



}
