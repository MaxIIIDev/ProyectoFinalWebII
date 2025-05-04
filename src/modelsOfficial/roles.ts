import { AutoIncrement, Column, DataType, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";



@Table
export class Roles extends Model{

    @PrimaryKey 
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Rol: number;

    @NotNull
    @Length({min:5,max:50})
    @Column(DataType.STRING)
    declare nombre: string;
}