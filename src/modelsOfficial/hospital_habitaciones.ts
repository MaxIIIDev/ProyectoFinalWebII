import { AutoIncrement, BelongsTo, Column, DataType, Default, ForeignKey, HasOne, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Hospital_camas } from "./hospital_camas";
import { Hospital_alas } from "./hospital_alas";

@Table
export class Hospital_habitaciones extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Habitacion: number;

    @NotNull
    @Column(DataType.INTEGER)
    declare nro_Habitacion:number;

  
    @HasOne(() => Hospital_camas)
        declare cama: Hospital_camas

    
    @ForeignKey(() => Hospital_alas)
    @Column(DataType.INTEGER)
    declare id_ala: number; 

    @BelongsTo(() => Hospital_alas)
    declare ala: Hospital_alas

}

