import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Length, Model, NotNull, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Usuarios } from "./usuarios";
import { Paciente_Evaluacion_Fisica } from "./paciente_evaluacion_fisica";
import { paciente_tratamientos } from "./paciente_tratamientos";


@Table
export class Enfermero extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Enfermero : number;

    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare nombre:string;

    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare apellido:string;

    @NotNull
    @Unique
    @Column(DataType.INTEGER)
    declare dni:number;

    @NotNull
    @Column(DataType.DATE)
    declare fecha_nac: Date;

    @NotNull
    @Column(DataType.INTEGER)
    declare edad: number;

    
    @Column(DataType.DOUBLE)
    declare peso: number

    @NotNull
    @Length({min:6,max:20})
    @Column(DataType.STRING)
    declare genero :string ;


    @Column(DataType.NUMBER)
    declare telefono : number;

    @Column(DataType.INTEGER)
    declare telefono_De_Emergencia: number;

    @NotNull
    @Column(DataType.STRING)
    declare direccion:string;

    @Column(DataType.STRING)
    declare especialidad: string;


    @ForeignKey( () => Usuarios)
    @Column(DataType.INTEGER)
    declare id_usuario: Usuarios

    @BelongsTo( () => Usuarios)
    declare usuario: Usuarios

    @HasMany(()=> Paciente_Evaluacion_Fisica)
    declare evaluaciones_fisicas: Paciente_Evaluacion_Fisica[]

    @HasOne(()=> paciente_tratamientos)
    declare tratamiento: paciente_tratamientos
}
