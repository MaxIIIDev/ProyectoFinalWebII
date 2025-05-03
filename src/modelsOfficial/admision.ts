import { AllowNull, AutoIncrement, Column, CreatedAt, DataType, Length, Model, NotNull, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";



@Table
export class Admision extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare idAdmision : number;

    @AllowNull(false)
    @Length({min: 3, max:255})
    @Column(DataType.STRING)
    declare tipoDeAdmision: string;

    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare estado:string;

    @NotNull
    @Length({min:3,max:255})
    @Column(DataType.STRING)
    declare motivoDeInternacion:string;

    @CreatedAt
    @AllowNull(false)
    @Column(DataType.DATE)
    declare fechaDeAdmision: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    declare fechaDeActualizacion: Date;
} 

