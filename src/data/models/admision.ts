import { AllowNull, AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasMany, HasOne, Length, Model, NotNull, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Hospital_camas } from "./hospital_camas";
import { Pacientes } from "./pacientes";
import { tipo_De_Admision } from "./tipo_de_admision";
import { PrioridadDeAtencion } from "./prioridadDeAtencion";
import { motivo_De_Internacion } from "./motivo_De_Internacion";
import { Sintomas } from "./sintomas";



@Table
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

    @ForeignKey(()=> motivo_De_Internacion)
    @Column(DataType.INTEGER)
    declare id_motivo_de_Internacion: number;

    @BelongsTo(()=> motivo_De_Internacion)
    declare motivo_de_internacion: motivo_De_Internacion

   
    @HasMany(()=> Sintomas)
    declare sintomas: Sintomas[]

    @ForeignKey(()=> PrioridadDeAtencion)
    @Column(DataType.INTEGER)
    declare id_prioridad_de_atencion:number

    @BelongsTo(()=> PrioridadDeAtencion)
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


} 

