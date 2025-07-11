import { AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Length, Model, NotNull, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Paciente_recetas } from "./Paciente_recetas";
import { paciente_tratamientos } from "./paciente_tratamientos";
import { Tipo_De_Medicamento } from "./Tipo_De_Medicamento";
import { Paciente_Medicacion_Actual } from "./Paciente_Medicacion_Actual";
import { RecetasMedicamentos } from "./RecetaMedicamentos";

@Table({ tableName: "medicamentos" })
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
    
    @BelongsTo(()=> Tipo_De_Medicamento)
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


    @HasMany(()=> paciente_tratamientos)
    declare tratamientos: paciente_tratamientos[]

    @HasMany(()=> Paciente_Medicacion_Actual)
    declare Paciente_Medicacion_Actual : Paciente_Medicacion_Actual[]

    @BelongsToMany(()=> Paciente_recetas, () => RecetasMedicamentos)
    declare recetas: Paciente_recetas[]
}

