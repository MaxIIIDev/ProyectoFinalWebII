import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Length, Model, NotNull, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Usuarios } from "./usuarios";


@Table
export class Personal_de_admision extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_personal_de_admision: number; 

    @AllowNull(false)
    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare nombre:string;

    @AllowNull(false)
    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare apellido:string;

    @AllowNull(false)
    @NotNull
    @Unique
    @Column(DataType.INTEGER)
    declare dni:number;

    @AllowNull(false)
    @NotNull
    @Column(DataType.DATE)
    declare fecha_nac: Date;

    @AllowNull(false)
    @NotNull
    @Column(DataType.INTEGER)
    declare edad: number;

    @AllowNull(false)
    @NotNull
    @Length({min:6,max:20})
    @Column(DataType.STRING)
    declare genero :string ;


    @Column(DataType.INTEGER)
    declare telefono : number;

    @Column(DataType.INTEGER)
    declare telefono_De_Emergencia: number;

    @AllowNull(false)
    @NotNull
    @Column(DataType.STRING)
    declare direccion:string;

   

    @ForeignKey(()=> Usuarios)
    @Column(DataType.INTEGER)
    declare id_usuario: number;

    @BelongsTo(()=> Usuarios)
    declare usuario: Usuarios

}
