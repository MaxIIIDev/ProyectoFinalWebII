import { AutoIncrement, Column, DataType, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class Paciente_pruebas_diagnosticas extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Prueba_Diagnostica: number;

    @NotNull
    @Length({min: 10, max: 255})
    @Column(DataType.STRING)
    declare nombre : string

    @NotNull
    @Length({min: 10, max: 255})
    @Column(DataType.STRING)
    declare resultado : string




}

