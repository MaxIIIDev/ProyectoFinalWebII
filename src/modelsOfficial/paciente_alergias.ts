import { AutoIncrement, Column, DataType, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class Paciente_Alergias extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Alergia:number;

    @NotNull
    @Column(DataType.STRING)
    declare nombre: string;

    @NotNull
    @Column(DataType.STRING)
    declare descripcion:string;

    


}
