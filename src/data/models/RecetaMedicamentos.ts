import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Paciente_recetas } from "./Paciente_recetas";
import { Medicamentos } from "./Medicamentos";

@Table({
    tableName: "recetas_medicamentos",
    })
export class RecetasMedicamentos extends Model{

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id_Recetas_Medicamentos: number;

    @ForeignKey(()=> Paciente_recetas)
    @Column(DataType.INTEGER)
    id_Receta: number;

    @BelongsTo(()=> Paciente_recetas)
    receta: Paciente_recetas

    @ForeignKey(()=> Medicamentos)
    @Column(DataType.INTEGER)
    id_Medicamento: number;

    @BelongsTo(()=> Medicamentos)
    medicamento: Medicamentos

    @Column(DataType.STRING)
    declare indicacion : string
}
    
