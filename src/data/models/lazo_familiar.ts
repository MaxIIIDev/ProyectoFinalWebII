import { PrimaryKey, AutoIncrement, Column, DataType, Model, ForeignKey, BelongsTo, Table } from "sequelize-typescript";
import { Paciente_antecedentes_familiares } from "./Paciente_antecedentes_familiares";


@Table({ tableName: "lazo_familiar" })
export class Lazo_Familiar extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Lazo_Familiar:number;

    @Column(DataType.STRING)
    declare lazo:string;

    @ForeignKey(()=> Paciente_antecedentes_familiares)
    @Column(DataType.INTEGER)
    declare id_paciente_antecedente_familiar:number;

    @BelongsTo(()=> Paciente_antecedentes_familiares)
    declare paciente_antecedente_familiar: Paciente_antecedentes_familiares

}