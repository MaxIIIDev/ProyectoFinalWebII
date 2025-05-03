import { AutoIncrement, Column, DataType, Length, Model, NotNull, PrimaryKey, Unique } from "sequelize-typescript";



export class Enfermero extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare idEnfermero : number;

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
    declare telefonoDeEmergencia: number;

    @NotNull
    @Column(DataType.STRING)
    declare direccion:string;

    @Column(DataType.STRING)
    declare especialidad: string;

}
