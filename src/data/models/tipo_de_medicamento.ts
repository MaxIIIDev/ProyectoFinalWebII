import { AutoIncrement, BelongsTo, Column, DataType, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Medicamentos } from "./Medicamentos";


@Table({ tableName: "tipo_de_medicamento" })
export class Tipo_De_Medicamento extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_tipo_de_medicamento: number

    @Column(DataType.STRING)
    declare nombre: string

    @HasOne(()=> Medicamentos)
    declare medicamentos: Medicamentos

}