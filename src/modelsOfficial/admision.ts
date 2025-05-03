import { AllowNull, AutoIncrement, Column, CreatedAt, DataType, Length, Model, NotNull, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";



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

    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare estado:string;

    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare motivo_De_Internacion:string;

    @CreatedAt
    @AllowNull(false)
    @Column(DataType.DATE)
    declare fecha_De_Admision: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    declare fecha_De_Actualizacion: Date;
} 

