import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, Default, ForeignKey, HasOne, IsEmail, Model, NotNull, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Enfermero } from "./enfermeros";
import { Medicos } from "./medicos";
import { Roles } from "./roles";


@Table

export class Usuarios extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Usuario: number;

    @AllowNull(false)
    @IsEmail
    @Unique
    @NotNull
    @Column(DataType.STRING)
    declare email: string;

    @AllowNull(false)
    @NotNull
    @Column(DataType.STRING)
    declare password_hash: string


    @Default(true)
    @Column(DataType.BOOLEAN)
    declare activo: boolean    

    @Default(0)
    @Column(DataType.INTEGER)
    declare intentos_fallidos: number;

    @HasOne(() => Enfermero)
    declare enfermero: Enfermero

    @HasOne(() => Medicos)
    declare medico: Medicos

    @ForeignKey(()=> Roles)
    @Column(DataType.INTEGER)
    declare id_Rol: number

    @BelongsTo(()=> Roles)
    declare rol: Roles
    

}
