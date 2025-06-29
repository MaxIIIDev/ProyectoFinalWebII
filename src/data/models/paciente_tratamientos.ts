import { AllowNull, AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasMany, HasOne, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Paciente_Alergias } from "./Paciente_Alergias";
import { Paciente_Diagnosticos } from "./Paciente_Diagnosticos";
import { Pacientes } from "./Pacientes";
import { Medicamentos } from "./Medicamentos";
import { Enfermero } from "./Enfermero";
import { Tipo_De_tratamiento } from "./Tipo_De_tratamiento";
import { Medicos } from "./Medicos";

@Table({ tableName: "paciente_tratamientos" })
export class paciente_tratamientos extends Model{


    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_tratamiento: number;

    @ForeignKey(()=> Tipo_De_tratamiento)
    @Column(DataType.INTEGER)
    declare id_tipo_de_tratamiento: number;

    @BelongsTo(()=> Tipo_De_tratamiento)
    declare tipo_de_tratamiento: Tipo_De_tratamiento

    @AllowNull(false)
    @NotNull
    @Column(DataType.STRING)
    declare detalle: string;

    @AllowNull(false)
    @NotNull
    @Column(DataType.DOUBLE)
    declare cantidad_suministrada: number;

    @CreatedAt
    @Column(DataType.DATE)
    declare fecha_de_inicio: Date

    @Column(DataType.DATE)
    declare fecha_de_fin: Date

    @HasMany(()=> Paciente_Alergias)
    declare alergias: Paciente_Alergias[]

    @HasOne(()=> Paciente_Diagnosticos)
    declare diagnostico: Paciente_Diagnosticos

    // @HasOne(()=> paciente_tratamientos)
    // declare tratamiento: paciente_tratamientos

    @ForeignKey(()=> Pacientes)
    @Column(DataType.INTEGER)
    declare id_paciente: number;

    @BelongsTo(()=>Pacientes)
    declare paciente: Pacientes

    @ForeignKey(()=> Medicamentos)
    @Column(DataType.INTEGER)
    declare id_medicamento: number

    @BelongsTo(()=> Medicamentos)
    declare medicamento: Medicamentos

    @ForeignKey(()=> Enfermero)
    @Column(DataType.INTEGER)
    declare id_enfermero : number

    @BelongsTo(()=> Enfermero)
    declare enfermero: Enfermero

    @ForeignKey(()=> Medicos)
    @Column(DataType.INTEGER)
    declare id_medico: number

    @BelongsTo(()=> Medicos)
    declare medico: Medicos
}
