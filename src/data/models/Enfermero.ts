import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Length, Model, NotNull, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Usuarios } from "./Usuarios";

import { paciente_tratamientos } from "./paciente_tratamientos";
import { Paciente_Evaluacion_Fisica } from "./Paciente_Evaluacion_Fisica";


@Table({ tableName: "enfermeros" })
export class Enfermero extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Enfermero : number;

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

    @AllowNull(false)
    @NotNull
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
    declare telefono_de_emergencia: number;

    @AllowNull(false)
    @NotNull
    @Column(DataType.STRING)
    declare direccion:string;



    @ForeignKey( () => Usuarios)
    @Column(DataType.INTEGER)
    declare id_usuario: number

    @BelongsTo( () => Usuarios)
    declare usuario: Usuarios

     @HasMany(()=> Paciente_Evaluacion_Fisica)
     declare evaluaciones_fisicas: Paciente_Evaluacion_Fisica[]

    @HasOne(()=> paciente_tratamientos)
    declare tratamiento: paciente_tratamientos
}
