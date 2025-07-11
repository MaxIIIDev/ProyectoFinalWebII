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
    declare id_Recetas_Medicamentos: number;

    @ForeignKey(()=> Paciente_recetas)
    @Column({
        type: DataType.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })
    declare id_Receta: number;

    @BelongsTo(()=> Paciente_recetas)
    declare receta: Paciente_recetas

    @ForeignKey(()=> Medicamentos)
    @Column({
        type: DataType.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    })
    declare id_Medicamento: number;

    @BelongsTo(()=> Medicamentos)
    declare medicamento: Medicamentos

    @Column(DataType.STRING)
    declare indicacion : string
}
    
