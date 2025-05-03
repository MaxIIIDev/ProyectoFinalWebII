import { AutoIncrement, Column, DataType, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class Medicamentos extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Medicamento:number;

    @NotNull
    @Length({min:3,max:100})
    @Column(DataType.STRING)
    declare nombre:string;

    @NotNull
    @Length({min:3,max:100})
    @Column(DataType.STRING)
    declare tipo:string;

    @NotNull
    @Column(DataType.DOUBLE)
    declare dosis_Recomendada:number;

    @NotNull
    @Column(DataType.DOUBLE)
    declare cantidad_Contenida: number;

    @Column(DataType.INTEGER)
    declare codigo:number;

}

