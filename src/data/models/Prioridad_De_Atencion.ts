import { AllowNull, AutoIncrement, Column, DataType, HasOne, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Admision } from "./Admision";


@Table({ tableName: "prioridad_de_atencion" })
export class Prioridad_De_Atencion extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_prioridad_de_atencion: number;

    @AllowNull(false)
    @NotNull
    @Column(DataType.STRING)
    declare prioridad: string;

    @HasOne(() => Admision)
    declare admision: Admision;

}
