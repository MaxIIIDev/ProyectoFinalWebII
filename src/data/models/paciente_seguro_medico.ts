import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, Default, ForeignKey, HasOne, Length, Model, NotNull, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Pacientes } from "./pacientes";
import { CategoriaSeguro } from "./categoriaSeguro";


@Table
export class Paciente_seguro_medico extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_seguro_medico: number;

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