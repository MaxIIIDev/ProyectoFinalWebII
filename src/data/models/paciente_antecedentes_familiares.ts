import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Pacientes } from "./Pacientes";
import { Lazo_Familiar } from "./Lazo_familiar";



@Table({ tableName: "paciente_antecedentes_familiares" })

export class Paciente_antecedentes_familiares extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Antecedente_Familiar: number;
   
    @AllowNull(false)
    @NotNull
    @Length({min:10,max:255})
    @Column(DataType.STRING)
    declare nombre_Enfermedad:string;
   
    @AllowNull(false)
    @NotNull
    @Length({min:10,max:255})
    @Column(DataType.STRING)
    declare detalles:string;

    @HasMany(()=> Lazo_Familiar)
    declare lazo_familiar: Lazo_Familiar[]

    @ForeignKey(()=> Pacientes)
    @Column(DataType.INTEGER)
    declare id_Paciente: number

    @BelongsTo(()=> Pacientes)
    declare paciente: Pacientes



}
