import { AllowNull, AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasMany, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Medicos } from "./Medicos";
import { Pacientes } from "./Pacientes";
import { paciente_tratamientos } from "./paciente_tratamientos";
import { Paciente_pruebas_diagnosticas } from "./Paciente_pruebas_diagnosticas";
import { Sintomas } from "./Sintomas";
import { Tipo_De_Diagnostico } from "./Tipo_De_Diagnostico";
import { Admision } from "./Admision";


@Table({ tableName: "paciente_diagnosticos" })
export class Paciente_Diagnosticos extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Paciente_Diagnosticos: number;

    @CreatedAt
    @Column(DataType.DATE)
    declare fecha: Date;

    @ForeignKey(()=> Tipo_De_Diagnostico)
    @Column(DataType.INTEGER)
    declare id_tipo_de_diagnostico: number
    
    @BelongsTo(()=> Tipo_De_Diagnostico)
    declare tipo_de_diagnostico: Tipo_De_Diagnostico

    @HasMany(()=> Sintomas)
    declare sintomas: Sintomas[]



    @AllowNull(false)
    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare detalles: string;

    @ForeignKey(()=> Medicos)
    @Column(DataType.INTEGER)
    declare id_medico: number

    @BelongsTo(()=> Medicos)
    declare medico: Medicos

    @ForeignKey(()=> Pacientes)
    @Column(DataType.INTEGER)
    declare id_paciente: number

    @BelongsTo(()=> Pacientes)
    declare paciente: Pacientes

    @ForeignKey(()=> paciente_tratamientos)
    @Column(DataType.INTEGER)
    declare id_tratamiento: number

    @BelongsTo(()=> paciente_tratamientos)
    declare tratamiento: paciente_tratamientos

    @HasMany(()=> Paciente_pruebas_diagnosticas)
    declare pruebas_diagnosticas: Paciente_pruebas_diagnosticas

    @ForeignKey(()=> Admision)
    @Column(DataType.INTEGER)
    declare id_Admision: number

    @BelongsTo(()=> Admision)
    declare admision: Admision

}
