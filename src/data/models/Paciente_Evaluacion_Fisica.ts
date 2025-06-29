 import { AllowNull, AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
 import { Pacientes } from "./Pacientes";
 import { Enfermero } from "./Enfermero"
import { Admision } from "./Admision";
 @Table({
        tableName: "paciente_evaluacion_fisica"
 })
 export class Paciente_Evaluacion_Fisica extends Model{
     
    @PrimaryKey
     @AutoIncrement
     @Column(DataType.INTEGER)
     declare id_Evaluacion_fisica: number
     
     @CreatedAt
     @Column(DataType.DATE)
     declare fecha: Date
     
     @AllowNull(false)
     @NotNull
     @Column(DataType.INTEGER)
     declare presion_arterial:number
     
     @AllowNull(false)
     @NotNull
     @Column(DataType.INTEGER)
     declare frecuencia_cardiaca:number
     
     @Column(DataType.STRING)
     declare color_de_piel:string
     
     @Column(DataType.STRING)
     declare respuesta_a_estimulos:string
     
     @ForeignKey(()=> Pacientes)
     @Column(DataType.INTEGER)
     declare id_Paciente: number
     
     @BelongsTo(()=> Pacientes)
     declare paciente: Pacientes
     
     @ForeignKey(()=> Enfermero)
     @Column(DataType.INTEGER)
     declare id_Enfermero: number
     
     @BelongsTo(()=> Enfermero)
     declare enfermero: Enfermero

     @ForeignKey(()=> Admision)
     @Column(DataType.INTEGER)
     declare id_Admision: number

     @BelongsTo(()=> Admision)
     declare admision: Admision


 }