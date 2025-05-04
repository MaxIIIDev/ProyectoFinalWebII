import { AutoIncrement, Column, CreatedAt, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";


@Table
export class Paciente_recetas extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.DATE)
    declare id_Receta: number;

    @CreatedAt
    @Column(DataType.DATE)
    declare fecha: Date;

    

}
