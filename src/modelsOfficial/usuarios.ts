import { AutoIncrement, Column, DataType, Default, IsEmail, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";


@Table

export class Usuarios extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Usuario: number;

    @IsEmail
    @NotNull
    @Column(DataType.STRING)
    declare email: string;

    @NotNull
    @Column(DataType.STRING)
    declare password_hash: string


    @Default(true)
    @Column(DataType.BOOLEAN)
    declare activo: boolean    

    @Default(0)
    @Column(DataType.INTEGER)
    declare intentos_fallidos: number;

}
