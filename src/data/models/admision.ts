import { AllowNull, AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasOne, Length, Model, NotNull, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Hospital_camas } from "./hospital_camas";
import { Pacientes } from "./pacientes";



@Table
export class Admision extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_Admision : number;

    @AllowNull(false)
    @Length({min: 3, max:255})
    @Column(DataType.STRING)
    declare tipo_De_Admision: string;

    @AllowNull(false)
    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare estado:string;

    @AllowNull(false)
    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare motivo_De_Internacion:string;

    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare sintomas:string

    @Column(DataType.ENUM("BAJA","MEDIA","ALTA"))
    declare prioridad: string;
    
    @CreatedAt
    @AllowNull(false)
    @Column(DataType.DATE)
    declare fecha_De_Admision: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    declare fecha_De_Actualizacion: Date;

    @ForeignKey( () => Pacientes)
    @Column(DataType.INTEGER)
    declare id_Paciente : number

    @BelongsTo( () => Pacientes)
    declare pacientes: Pacientes

   @ForeignKey( () => Hospital_camas)
   @Column(DataType.INTEGER)
   declare id_Cama: number

   @BelongsTo( () => Hospital_camas)
    declare camas: Hospital_camas;


} 

