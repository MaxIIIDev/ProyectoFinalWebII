import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Length, Model, NotNull, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Usuarios } from "./usuarios";


@Table
export class Personal_de_admision extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_personal_de_admision: number; 

    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare nombre:string;

    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare apellido:string;

    @NotNull
    @Unique
    @Column(DataType.INTEGER)
    declare dni:number;

    @NotNull
    @Column(DataType.DATE)
    declare fecha_nac: Date;

    @NotNull
    @Column(DataType.INTEGER)
    declare edad: number;

    @NotNull
    @Length({min:6,max:20})
    @Column(DataType.STRING)
    declare genero :string ;


    @Column(DataType.NUMBER)
    declare telefono : number;

    @Column(DataType.INTEGER)
    declare telefono_De_Emergencia: number;

    @NotNull
    @Column(DataType.STRING)
    declare direccion:string;

    @NotNull
    @Column(DataType.STRING)
    declare tipo_sanguineo: string

    @ForeignKey(()=> Usuarios)
    @Column(DataType.INTEGER)
    declare id_usuario: number;

    @BelongsTo(()=> Usuarios)
    declare usuario: Usuarios

}
