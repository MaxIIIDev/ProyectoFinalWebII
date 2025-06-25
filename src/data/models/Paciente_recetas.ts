import { AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Pacientes } from "./Pacientes";
import { Medicos } from "./Medicos";
import { Medicamentos } from "./Medicamentos";


@Table({
    tableName: "paciente_recetas"
})
export class Paciente_recetas extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Receta: number;

    @CreatedAt
    @Column(DataType.DATE)
    declare fecha: Date;

    @ForeignKey(()=> Pacientes)
    @Column(DataType.INTEGER)
    declare id_paciente: number

    @BelongsTo(()=> Pacientes)
    declare paciente: Pacientes

    @ForeignKey(()=>Medicos)
    @Column(DataType.INTEGER)
    declare id_medico: number

    @BelongsTo(()=> Medicos)
    declare medico: Medicos

    @ForeignKey(()=>Medicamentos)
    @Column(DataType.INTEGER)
    declare id_medicamento: number

    @BelongsTo(()=> Medicamentos)
    declare medicamento: Medicamentos


}
