import { AutoIncrement, BelongsTo, BelongsToMany, Column, CreatedAt, DataType, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Pacientes } from "./Pacientes";
import { Medicos } from "./Medicos";
import { Medicamentos } from "./Medicamentos";
import { Paciente_Medicacion_Actual } from "./Paciente_Medicacion_Actual";
import { RecetasMedicamentos } from "./RecetaMedicamentos";
import { Admision } from "./Admision";


@Table({
    tableName: "paciente_recetas"
})
export class Paciente_recetas extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Receta: number;

    @CreatedAt
    @Column(DataType.DATEONLY)
    declare fecha: Date;

    
    @ForeignKey(()=> Pacientes)
    @Column(DataType.INTEGER)
    declare id_paciente: number

    @BelongsTo(()=> Pacientes)
    declare paciente: Pacientes

    @ForeignKey(()=>Medicos)
    @Column(DataType.INTEGER)
    declare id_medico: number

    @BelongsTo(()=> Medicos)
    declare medico: Medicos

    @BelongsToMany(()=> Medicamentos, () => RecetasMedicamentos)
    declare medicamento: Medicamentos[]

    @ForeignKey(()=> Admision)
    @Column(DataType.INTEGER)
    declare id_admision: number

    @BelongsTo(()=> Admision)
    declare admision: Admision

}
