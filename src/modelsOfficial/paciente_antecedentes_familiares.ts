import { AutoIncrement, Column, DataType, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";



@Table

export class Paciente_antecedentes_familiares extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Antecedente_Familiar: number;

    @NotNull
    @Length({min:10,max:255})
    @Column(DataType.STRING)
    declare nombre_Enfermedad:string;
    
    @NotNull
    @Length({min:10,max:255})
    @Column(DataType.STRING)
    declare detalles:string;

    
    @NotNull
    @Length({min:10,max:100})
    @Column(DataType.STRING)
    declare lazo_familiar:string;

    



}
