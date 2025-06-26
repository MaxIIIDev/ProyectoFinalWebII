import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Paciente_recetas } from "./Paciente_recetas";
import { Medicamentos } from "./Medicamentos";
import { Admision } from "./Admision";


@Table({tableName:"paciente_medicacion_actual"})
export class Paciente_Medicacion_Actual extends Model {
    
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Paciente_Medicacion_Actual : number

    @AllowNull(true)
    @ForeignKey(()=> Paciente_recetas)
    @Column(DataType.INTEGER)
    declare id_Receta: number

    @BelongsTo(()=> Paciente_recetas)
    declare recetas: Paciente_recetas

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


}