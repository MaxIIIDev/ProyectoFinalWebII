import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Length, Model, NotNull, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Tipo_Sanguineo } from "./Tipo_Sanguineo";
import { Admision } from "./Admision";
import { Paciente_Alergias } from "./Paciente_Alergias";
import { Paciente_antecedentes_familiares } from "./Paciente_antecedentes_familiares";
import { Paciente_Diagnosticos } from "./Paciente_Diagnosticos";
import { Paciente_Evaluacion_Fisica } from "./Paciente_Evaluacion_Fisica";
import { Paciente_pruebas_diagnosticas } from "./Paciente_pruebas_diagnosticas";
import { Paciente_recetas } from "./Paciente_recetas";
import { Paciente_seguro_medico } from "./Paciente_seguro_medico";
import { paciente_tratamientos } from "./paciente_tratamientos";
import { Turnos } from "./Turnos";
import { Paciente_Cirugias } from "./Paciente_Cirugias";




@Table({ tableName: "pacientes" })
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


    @Column(DataType.BIGINT)
    declare telefono : bigint;

    @Column(DataType.BIGINT)
    declare telefono_De_Emergencia: bigint;

    @AllowNull(false)
    @NotNull
    @Column(DataType.STRING)
    declare direccion:string;

    
    @ForeignKey(()=> Tipo_Sanguineo)
    @Column(DataType.INTEGER)
    declare id_tipo_sanguineo:number;
    
    @BelongsTo(()=> Tipo_Sanguineo)
    declare tipo_sanguineo: Tipo_Sanguineo

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

    @HasMany(() => Paciente_Cirugias)
    declare cirugias: Paciente_Cirugias[]

    @HasOne(()=> Paciente_Diagnosticos)
    declare diagnostico: Paciente_Diagnosticos

     @HasMany(()=> Paciente_Evaluacion_Fisica)
     declare evaluaciones_fisicas: Paciente_Evaluacion_Fisica[]

    @HasMany(() => Paciente_pruebas_diagnosticas)
    declare pruebasDiagnosticasDelPaciente: Paciente_pruebas_diagnosticas[];

    @HasMany(()=> Paciente_recetas)
    declare recetas: Paciente_recetas

    // @HasMany(()=> paciente_terapia_fisica)
    // declare terapias_fisicas: paciente_terapia_fisica

    @HasMany(()=> paciente_tratamientos)
    declare tratamientos: paciente_tratamientos[]

    @HasMany(()=> Turnos)
    declare turnos: Turnos


}