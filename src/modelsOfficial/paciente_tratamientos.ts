import { AutoIncrement, Column, CreatedAt, DataType, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class paciente_tratamientos extends Model{


    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_tratamiento: number;

    @NotNull
    @Column(DataType.STRING)
    declare tipo: string;

    @NotNull
    @Column(DataType.STRING)
    declare detalle: string;

    @NotNull
    @Column(DataType.DOUBLE)
    declare cantidad_suministrada: number;

    @CreatedAt
    @Column(DataType.DATE)
    declare fecha_de_inicio: Date

    @Column(DataType.DATE)
    declare fecha_de_fin: Date

    




}
