import { AllowNull, AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasMany, HasOne, Length, Model, NotNull, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { motivo_De_Internacion } from "./Motivo_De_Internacion";
import { Hospital_camas } from "./Hospital_camas";
import { Pacientes } from "./Pacientes";
import { Prioridad_De_Atencion } from "./Prioridad_De_Atencion";
import { Sintomas } from "./Sintomas";
import { tipo_De_Admision } from "./tipo_de_Admision";
import { Paciente_Medicacion_Actual } from "./Paciente_Medicacion_Actual";
import { Paciente_Evaluacion_Fisica } from "./Paciente_Evaluacion_Fisica";
import { Paciente_Diagnosticos } from "./Paciente_Diagnosticos";
import { Paciente_Cirugias } from "./Paciente_Cirugias";
import { paciente_tratamientos } from "./paciente_tratamientos";
import { Paciente_recetas } from "./Paciente_recetas";
 



@Table({ tableName: "admisiones" })
export class Admision extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Admision : number;

    @AllowNull(false)
    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare estado:string;

    @Column(DataType.STRING)
    declare recomendacion_seguimiento_medico: string

    @ForeignKey(()=> motivo_De_Internacion)
    @Column(DataType.INTEGER)
    declare id_motivo_de_Internacion: number;

    @BelongsTo(()=> motivo_De_Internacion)
    declare motivo_de_internacion: motivo_De_Internacion

   
    @HasMany(()=> Sintomas)
    declare sintomas: Sintomas[]

    @ForeignKey(()=> Prioridad_De_Atencion)
    @Column(DataType.INTEGER)
    declare id_prioridad_de_atencion:number

    @BelongsTo(()=> Prioridad_De_Atencion)
    declare prioridad_de_atencion: string
    
    @ForeignKey(()=> tipo_De_Admision)
    @Column(DataType.INTEGER)
    declare id_tipo_de_admision:number

    @BelongsTo(()=> tipo_De_Admision)
    declare tipo_de_admision: tipo_De_Admision

    @CreatedAt
    @AllowNull(false)
    @Column(DataType.DATE)
    declare fecha_De_Admision: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    declare fecha_De_Actualizacion: Date;

    @ForeignKey( () => Pacientes)
    @Column(DataType.INTEGER)
    declare id_Paciente : number

    @BelongsTo( () => Pacientes)
    declare pacientes: Pacientes

   @ForeignKey( () => Hospital_camas)
   @Column(DataType.INTEGER)
   declare id_Cama: number

   @BelongsTo( () => Hospital_camas)
    declare camas: Hospital_camas;

    @HasOne(()=> Paciente_Medicacion_Actual)
    declare Paciente_Medicacion_Actual: Paciente_Medicacion_Actual

    @HasMany(()=> Paciente_Evaluacion_Fisica)
    declare paciente_evaluacion_fisica: Paciente_Evaluacion_Fisica[]

    @HasMany(()=> Paciente_Diagnosticos)
    declare paciente_diagnosticos: Paciente_Diagnosticos[]

    @HasMany(()=> Paciente_Cirugias)
    declare paciente_cirugias: Paciente_Cirugias[]

    @HasMany(()=> paciente_tratamientos)
    declare paciente_tratamientos: paciente_tratamientos[]

    @HasMany(()=> Paciente_recetas)
    declare paciente_recetas: Paciente_recetas[]
}

