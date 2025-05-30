import { AutoIncrement, Column, DataType, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript"
import { Medicos } from "./Medicos";

@Table({ tableName: "especialidades" })
export class Especialidades  extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Especialidad:number;

    @Column(DataType.STRING)
    declare nombre:string;

    @HasOne(()=> Medicos)
    declare medicos: Medicos[]

    


}
