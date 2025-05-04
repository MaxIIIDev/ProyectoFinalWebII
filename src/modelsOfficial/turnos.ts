import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Pacientes } from "./pacientes";
import { Medicos } from "./medicos";


@Table
export class Turnos extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_turno: number

    @NotNull
    @Column(DataType.DATE)
    declare fecha: Date;

    @NotNull
    @Column(DataType.DATE)
    declare horario:Date;

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