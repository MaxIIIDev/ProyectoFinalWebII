import { AllowNull, AutoIncrement, Column, DataType, HasOne, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Usuarios } from "./usuarios";



@Table
export class Roles extends Model{

    @PrimaryKey 
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Rol: number;

    @AllowNull(false)
    @NotNull
    @Length({min:5,max:50})
    @Column(DataType.STRING)
    declare nombre: string;

    @HasOne(()=> Usuarios)
    declare usuario: Usuarios
}