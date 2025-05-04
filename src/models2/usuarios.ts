import { AllowNull, AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasOne, Model, NotNull, PrimaryKey, Table, Unique, UpdatedAt } from "sequelize-typescript";
import { Team } from "./materias";

@Table
export class Usuarios extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare idUsuario: number;

    @Column(DataType.STRING)    
    declare nombre: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.INTEGER)
    declare dni: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare edad: number;

    

    @CreatedAt
    @AllowNull(false)
    @Column(DataType.DATE)

    declare fechaRegistro: Date;
    @UpdatedAt
    @AllowNull(false)
    @Column(DataType.DATE)
    declare fechaModificacion: Date;

    @ForeignKey( () => Team)
    @Column(DataType.INTEGER)
    declare idTeam: number;
    
    @BelongsTo( () => Team)
    declare team: Team;
    
   
   
}
