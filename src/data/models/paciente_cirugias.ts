import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Pacientes } from "./pacientes";
import { Medicos } from "./medicos";


@Table

export class paciente_cirugias extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_cirugia:number;

    @AllowNull(false)
    @NotNull
    @Column(DataType.DATE)
    declare fecha:Date;

    @AllowNull(false)
    @NotNull
    @Length({min:10,max:255})
    @Column(DataType.STRING)
    declare nombre: string;

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
