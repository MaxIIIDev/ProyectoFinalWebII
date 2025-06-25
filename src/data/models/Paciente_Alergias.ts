import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Pacientes } from "./Pacientes";
import { paciente_tratamientos } from "./paciente_tratamientos";
import { nombre_Alergia } from "./Nombre_Alergia";

@Table({ tableName: "paciente_alergias" })
export class Paciente_Alergias extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Alergia:number;

    @ForeignKey(() => nombre_Alergia)
    @Column(DataType.INTEGER)
    declare id_nombre_alergia: number;
    @BelongsTo(() => nombre_Alergia)
    declare nombre_alergia: nombre_Alergia

    @AllowNull(false)
    @NotNull
    @Column(DataType.STRING)
    declare descripcion:string;

    @ForeignKey(() => Pacientes)
    @Column(DataType.INTEGER)
    declare id_paciente: number;

    @BelongsTo(()=> Pacientes)
    declare paciente: Pacientes

    //tratamiento
    @ForeignKey(() => paciente_tratamientos)
    @Column(DataType.INTEGER)
    declare id_tratamiento: number;

    @BelongsTo(() => paciente_tratamientos)
    declare tratamiento: paciente_tratamientos

}
