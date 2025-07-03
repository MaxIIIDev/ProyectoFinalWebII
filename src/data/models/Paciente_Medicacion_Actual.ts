import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Paciente_recetas } from "./Paciente_recetas";
import { Medicamentos } from "./Medicamentos";
import { Admision } from "./Admision";
import { Pacientes } from "./Pacientes";


@Table({tableName:"paciente_medicacion_actual"})
export class Paciente_Medicacion_Actual extends Model {
    
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Paciente_Medicacion_Actual : number

    @AllowNull(false)
    @Length({min: 10, max: 200})
    @Column(DataType.STRING)
    declare motivo: string

    @ForeignKey(()=> Medicamentos)
    @Column(DataType.INTEGER)
    declare id_Medicamento: number

    @BelongsTo(()=> Medicamentos)
    declare medicamentos: Medicamentos

    @ForeignKey(()=> Admision)
    @Column(DataType.INTEGER)
    declare id_Admision : number

    @BelongsTo(()=> Admision)
    declare admision: Admision

    @ForeignKey(()=> Pacientes)
    @Column(DataType.INTEGER)
    declare id_Paciente: number

    @BelongsTo(()=> Pacientes)
    declare paciente:Pacientes


}