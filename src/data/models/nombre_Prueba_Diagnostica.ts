import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Paciente_pruebas_diagnosticas } from "./Paciente_pruebas_diagnosticas";

@Table({ tableName: "nombre_prueba_diagnostica" })
export class nombre_Prueba_Diagnostica extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_nombre_prueba_diagnostica: number;

    @Column(DataType.STRING)
    declare nombre: string;

    @HasMany(() => Paciente_pruebas_diagnosticas)
    declare paciente_pruebas_diagnosticas: Paciente_pruebas_diagnosticas[];
}
