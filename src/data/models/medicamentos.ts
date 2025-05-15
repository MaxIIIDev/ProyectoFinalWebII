import { AllowNull, AutoIncrement, Column, DataType, ForeignKey, HasMany, HasOne, Length, Model, NotNull, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Paciente_recetas } from "./paciente_recetas";
import { paciente_tratamientos } from "./paciente_tratamientos";
import { Tipo_De_Medicamento } from "./tipo_de_medicamento";

@Table
export class Medicamentos extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Medicamento:number;

    @AllowNull(false)
    @NotNull
    @Length({min:3,max:100})
    @Column(DataType.STRING)
    declare nombre:string;

    @ForeignKey(()=> Tipo_De_Medicamento)
    @Column(DataType.INTEGER)
    declare id_tipo_de_medicamento:number;
    
    @HasOne(()=> Tipo_De_Medicamento)
    declare tipo_de_medicamento: Tipo_De_Medicamento
    @AllowNull(false)
    @NotNull
    @Column(DataType.DOUBLE)
    declare dosis_Recomendada:number;

    @AllowNull(false)
    @NotNull
    @Column(DataType.DOUBLE)
    declare cantidad_Contenida: number;

    @Unique
    @Column(DataType.INTEGER)
    declare codigo:number;

    @HasOne(()=> Paciente_recetas)
    declare receta: Paciente_recetas

    @HasMany(()=> paciente_tratamientos)
    declare tratamientos: paciente_tratamientos[]
}

