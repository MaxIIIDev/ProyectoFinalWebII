import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Pacientes } from "./Pacientes";
import { Medicos } from "./Medicos";
import { horarios_Turnos } from "./horarios_Turnos";


@Table({ tableName: "turnos" })
export class Turnos extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_turno: number

    @AllowNull(false)
    @NotNull
    @Column(DataType.DATE)
    declare fecha: Date;

    @ForeignKey(()=> horarios_Turnos)
    @Column(DataType.INTEGER)
    declare id_horario_turno: number

    @BelongsTo(()=> horarios_Turnos)
    declare horario_turno: horarios_Turnos

    @AllowNull(false)
    @NotNull
    @Length({min:30,max:255})
    @Column(DataType.STRING)
    declare motivo: string

    @ForeignKey(()=> Pacientes)
    @Column(DataType.INTEGER)
    declare id_paciente: number

    @BelongsTo(()=> Pacientes)
    declare paciente: Pacientes

    @ForeignKey(()=> Medicos)
    declare id_medico: number;

    @BelongsTo(()=> Medicos)
    declare medico: Medicos
    


}