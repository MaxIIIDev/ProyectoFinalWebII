import { AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasMany, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Medicos } from "./medicos";
import { Pacientes } from "./pacientes";
import { paciente_tratamientos } from "./paciente_tratamientos";
import { Paciente_pruebas_diagnosticas } from "./paciente_pruebas_diagnosticas";


@Table
export class Paciente_Diagnosticos extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Paciente_Diagnosticos: number;

    @CreatedAt
    @Column(DataType.DATE)
    declare fecha: Date;

    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare nombre: string;

    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare sintomas: string;

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

}
