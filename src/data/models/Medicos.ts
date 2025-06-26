import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Length, Model, NotNull, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Usuarios } from "./Usuarios";
import { Paciente_Cirugias } from "./Paciente_Cirugias";
import { Paciente_Diagnosticos } from "./Paciente_Diagnosticos";
import { Paciente_recetas } from "./Paciente_recetas";
import { Turnos } from "./Turnos";
import { Especialidades } from "./Especialidades";

@Table({ tableName: "medicos" })
export class Medicos extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Medico:number;

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
    declare telefono_De_Emergencia: number;

    @AllowNull(false)
    @NotNull
    @Column(DataType.STRING)
    declare direccion:string;

    @ForeignKey(()=> Especialidades)
    @Column(DataType.INTEGER)
    declare id_Especialidad:number;
    
    @BelongsTo(()=> Especialidades)
    declare especialidad: Especialidades

    @HasOne(()=> Paciente_Cirugias)
    declare cirugia: Paciente_Cirugias

    @ForeignKey( () => Usuarios)
    @Column(DataType.INTEGER)
    declare id_usuario: Usuarios

    @BelongsTo( () => Usuarios)
    declare usuario: Usuarios

    @HasOne(()=> Paciente_Diagnosticos)
    declare diagnostico: Paciente_Diagnosticos

    @HasMany(()=> Paciente_recetas)
    declare recetas: Paciente_recetas[]

    @HasMany(()=> Turnos)
    declare turnos: Turnos[]

}
