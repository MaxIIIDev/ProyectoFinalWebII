import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { pacientes, pacientesId } from './pacientes';

export interface paciente_seguromedicoAttributes {
  idSeguroMedico: number;
  numero: number;
  estado?: number;
  categoria: string;
}

export type paciente_seguromedicoPk = "idSeguroMedico";
export type paciente_seguromedicoId = paciente_seguromedico[paciente_seguromedicoPk];
export type paciente_seguromedicoOptionalAttributes = "idSeguroMedico" | "estado";
export type paciente_seguromedicoCreationAttributes = Optional<paciente_seguromedicoAttributes, paciente_seguromedicoOptionalAttributes>;

export class paciente_seguromedico extends Model<paciente_seguromedicoAttributes, paciente_seguromedicoCreationAttributes> implements paciente_seguromedicoAttributes {
  idSeguroMedico!: number;
  numero!: number;
  estado?: number;
  categoria!: string;

  // paciente_seguromedico hasMany pacientes via idSeguroMedico
  pacientes!: pacientes[];
  getPacientes!: Sequelize.HasManyGetAssociationsMixin<pacientes>;
  setPacientes!: Sequelize.HasManySetAssociationsMixin<pacientes, pacientesId>;
  addPaciente!: Sequelize.HasManyAddAssociationMixin<pacientes, pacientesId>;
  addPacientes!: Sequelize.HasManyAddAssociationsMixin<pacientes, pacientesId>;
  createPaciente!: Sequelize.HasManyCreateAssociationMixin<pacientes>;
  removePaciente!: Sequelize.HasManyRemoveAssociationMixin<pacientes, pacientesId>;
  removePacientes!: Sequelize.HasManyRemoveAssociationsMixin<pacientes, pacientesId>;
  hasPaciente!: Sequelize.HasManyHasAssociationMixin<pacientes, pacientesId>;
  hasPacientes!: Sequelize.HasManyHasAssociationsMixin<pacientes, pacientesId>;
  countPacientes!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof paciente_seguromedico {
    return paciente_seguromedico.init({
    idSeguroMedico: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "numero"
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    categoria: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'paciente_seguromedico',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idSeguroMedico" },
        ]
      },
      {
        name: "numero",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "numero" },
        ]
      },
    ]
  });
  }
}
