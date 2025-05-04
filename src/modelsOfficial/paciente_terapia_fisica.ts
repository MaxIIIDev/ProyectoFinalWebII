import { AutoIncrement, Column, DataType, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";



@Table
export class paciente_terapia_fisica extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_terapia_fisica: number;

    @NotNull
    @Column(DataType.DATE)
    declare fecha:Date;

    @NotNull
    @Length({min:10,max:255})
    @Column(DataType.STRING)
    declare nombre:string;

    @NotNull
    @Column(DataType.INTEGER)
    declare duracion: number;

    

}