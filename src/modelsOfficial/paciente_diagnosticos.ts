import { AutoIncrement, Column, CreatedAt, DataType, Length, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";


@Table
export class Paciente_Diagnosticos extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Paciente_Diagnosticos: number;

    @CreatedAt
    @Column(DataType.DATE)
    declare fecha: Date;

    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare nombre: string;

    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare sintomas: string;

    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare detalles: string;

    

}
