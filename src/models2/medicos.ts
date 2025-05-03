import { AllowNull, AutoIncrement, Column, DataType, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class medicos extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare idMedico: number;

    @AllowNull(false)
    @Length({min:3, max: 255})
    @Column(DataType.STRING)
    declare nombre: string;


}