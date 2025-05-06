import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Paciente_Diagnosticos } from "./paciente_diagnosticos";
import { Pacientes } from "./pacientes";

@Table
export class Paciente_pruebas_diagnosticas extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Prueba_Diagnostica: number;

    @AllowNull(false)
    @NotNull
    @Length({min: 10, max: 255})
    @Column(DataType.STRING)
    declare nombre : string

    @AllowNull(false)
    @NotNull
    @Length({min: 10, max: 255})
    @Column(DataType.STRING)
    declare resultado : string

    @ForeignKey(()=> Paciente_Diagnosticos)
    @Column(DataType.INTEGER)
    declare id_diagnostico :number;

    @BelongsTo(()=> Paciente_Diagnosticos)
    declare diagnostico: Paciente_Diagnosticos

    @ForeignKey(()=> Pacientes)
    @Column(DataType.INTEGER)
    declare id_paciente: number;

    @BelongsTo(()=> Pacientes)
    declare paciente: Pacientes; 


}

