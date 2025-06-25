import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Paciente_Diagnosticos } from "./Paciente_Diagnosticos";
import { Pacientes } from "./Pacientes";
import { nombre_Prueba_Diagnostica } from "./Nombre_Prueba_Diagnostica";

@Table({
    tableName: "paciente_pruebas_diagnosticas"
})
export class Paciente_pruebas_diagnosticas extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Prueba_Diagnostica: number;

    @ForeignKey(()=> nombre_Prueba_Diagnostica)
    @Column(DataType.INTEGER)
    declare id_nombre_prueba_diagnostica: number;
    
    @BelongsTo(()=> nombre_Prueba_Diagnostica)
    declare nombre_prueba_diagnostica: nombre_Prueba_Diagnostica

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

