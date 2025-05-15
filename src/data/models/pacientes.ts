import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Length, Model, NotNull, PrimaryKey, Table, Unique } from "sequelize-typescript";

import { Paciente_seguro_medico } from "./paciente_seguro_medico";
import { Paciente_Alergias } from "./paciente_alergias";
import { Paciente_antecedentes_familiares } from "./paciente_antecedentes_familiares";
import { paciente_cirugias } from "./paciente_cirugias";
import { Paciente_Diagnosticos } from "./paciente_diagnosticos";
import { Paciente_Evaluacion_Fisica } from "./paciente_evaluacion_fisica";
import { Paciente_pruebas_diagnosticas } from "./paciente_pruebas_diagnosticas";
import { Paciente_recetas } from "./paciente_recetas";
import { paciente_terapia_fisica } from "./paciente_terapia_fisica";
import { paciente_tratamientos } from "./paciente_tratamientos";

import { Turnos } from "./turnos";
import { Admision } from "./admision";


@Table
export class Pacientes extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Paciente:number;

    @AllowNull(false)
    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare nombre:string;

    @AllowNull(false)
    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare apellido:string;

    @AllowNull(true)
    @Unique
    @Column(DataType.INTEGER)
    declare dni:number;

    @AllowNull(false)
    @NotNull
    @Column(DataType.DATE)
    declare fecha_nac: Date;

    @AllowNull(false)
    @NotNull
    @Column(DataType.INTEGER)
    declare edad: number;


    @Column(DataType.DOUBLE)
    declare peso: number

    @AllowNull(false)
    @NotNull
    @Length({min:6,max:20})
    @Column(DataType.STRING)
    declare genero :string ;


    @Column(DataType.INTEGER)
    declare telefono : number;

    @Column(DataType.INTEGER)
    declare telefono_De_Emergencia: number;

    @AllowNull(false)
    @NotNull
    @Column(DataType.STRING)
    declare direccion:string;

    
    @Column(DataType.STRING)
    declare tipo_sanguineo:string;

    @HasMany( () => Admision)
    declare admisiones: Admision[]


    @ForeignKey(() => Paciente_seguro_medico)
    @Column(DataType.INTEGER)
    declare id_seguro_medico: number

    @BelongsTo(()=> Paciente_seguro_medico)
    declare seguro_medico: Paciente_seguro_medico

    @HasMany(()=> Paciente_Alergias)
    declare alergias: Paciente_Alergias[]

    @HasMany(()=> Paciente_antecedentes_familiares)
    declare antecedentes: Paciente_antecedentes_familiares[]

    @HasMany(() => paciente_cirugias)
    declare cirugias: paciente_cirugias[]

    @HasOne(()=> Paciente_Diagnosticos)
    declare diagnostico: Paciente_Diagnosticos

    @HasMany(()=> Paciente_Evaluacion_Fisica)
    declare evaluaciones_fisicas: Paciente_Evaluacion_Fisica[]

    @HasMany(()=> Paciente_pruebas_diagnosticas)
    declare pruebas_diagnosticas: Paciente_pruebas_diagnosticas

    @HasMany(()=> Paciente_recetas)
    declare recetas: Paciente_recetas

    // @HasMany(()=> paciente_terapia_fisica)
    // declare terapias_fisicas: paciente_terapia_fisica

    @HasMany(()=> paciente_tratamientos)
    declare tratamientos: paciente_tratamientos[]

    @HasMany(()=> Turnos)
    declare turnos: Turnos


}