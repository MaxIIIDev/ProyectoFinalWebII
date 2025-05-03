import { AllowNull, AutoIncrement, Column, DataType, HasMany, Length, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Usuarios } from "../models2/usuarios";



@Table

export class Team extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare idTeam: number;

    @AllowNull(false)
    @Length({min:3,max: 255})
    @Column(DataType.STRING)
    declare nombre: string;

    @HasMany( () => Usuarios)
    declare usuarios: Usuarios[]


}
