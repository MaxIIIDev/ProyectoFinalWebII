import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, Default, ForeignKey, HasOne, Length, Model, NotNull, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Pacientes } from "./Pacientes";
import { CategoriaSeguro } from "./CategoriaSeguro";
import { Mutuales } from "./Mutuales";


@Table({ tableName: "paciente_seguro_medico" })
export class Paciente_seguro_medico extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_seguro_medico: number;

    @ForeignKey(()=> Mutuales)
    @Column(DataType.INTEGER)
    declare id_mutual: number;

    @BelongsTo(()=> Mutuales)
    declare mutual: Mutuales
    
    @AllowNull(false)
    @Unique
    @NotNull
    @Column(DataType.INTEGER)
    declare numero: number;

    @Default(true)
    @Column(DataType.BOOLEAN)
    declare estado: boolean;

    @ForeignKey(()=> CategoriaSeguro)
    @Column(DataType.INTEGER)
    declare id_categoria_seguro: number;

    @BelongsTo(()=> CategoriaSeguro)
    declare categoria_seguro: CategoriaSeguro

    @HasOne(()=> Pacientes)
    declare paciente: Pacientes

}