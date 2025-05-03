import { AutoIncrement, Column, CreatedAt, DataType, Model, NotNull, PrimaryKey } from "sequelize-typescript";


export class Paciente_Evaluacion_Fisica extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Evaluacion_fisica: number;

    @CreatedAt
    @Column(DataType.DATE)
    declare fecha: Date;

    @NotNull
    @Column(DataType.INTEGER)
    declare presion_arterial:number;

    @NotNull
    @Column(DataType.INTEGER)
    declare frecuencia_cardiaca:number;

    @Column(DataType.STRING)
    declare color_de_piel:string;

    @Column(DataType.STRING)
    declare respuesta_a_estimulos:string;

    





}
