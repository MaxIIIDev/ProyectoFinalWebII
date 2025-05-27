import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Pacientes } from "./Pacientes";
import { Medicos } from "./Medicos";
import { nombre_Cirugia } from "./nombre_Cirugia";


@Table({ tableName: "paciente_cirugias" })

export class Paciente_Cirugias extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_cirugia:number;

    @AllowNull(false)
    @NotNull
    @Column(DataType.DATE)
    declare fecha:Date;

    @ForeignKey(()=> nombre_Cirugia)
    @Column(DataType.INTEGER)
    declare id_nombre_cirugia: number;
    @BelongsTo(()=> nombre_Cirugia)
    declare nombre_cirugia: nombre_Cirugia

    @AllowNull(false)
    @NotNull
    @Length({min:10,max:255})
    @Column(DataType.STRING)
    declare descripcion: string;

    @ForeignKey(()=> Medicos)
    @Column(DataType.INTEGER)
    declare id_medico: number;

    @BelongsTo(()=> Medicos)
    declare medico: Medicos
    
    @ForeignKey(()=> Pacientes)
    @Column(DataType.INTEGER)
    declare id_paciente: number;

    @BelongsTo(()=> Pacientes)
    declare paciente: Pacientes


}
