import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { pacientes, pacientesId } from './pacientes';

export interface paciente_antecedentes_familiaresAttributes {
  idAntecedenteFamiliar: number;
  nombreEnfermedad: string;
  detalles: string;
  lazoFamiliar: string;
  idPaciente?: number;
}

export type paciente_antecedentes_familiaresPk = "idAntecedenteFamiliar";
export type paciente_antecedentes_familiaresId = paciente_antecedentes_familiares[paciente_antecedentes_familiaresPk];
export type paciente_antecedentes_familiaresOptionalAttributes = "idAntecedenteFamiliar" | "idPaciente";
export type paciente_antecedentes_familiaresCreationAttributes = Optional<paciente_antecedentes_familiaresAttributes, paciente_antecedentes_familiaresOptionalAttributes>;

export class paciente_antecedentes_familiares extends Model<paciente_antecedentes_familiaresAttributes, paciente_antecedentes_familiaresCreationAttributes> implements paciente_antecedentes_familiaresAttributes {
  idAntecedenteFamiliar!: number;
  nombreEnfermedad!: string;
  detalles!: string;
  lazoFamiliar!: string;
  idPaciente?: number;

  // paciente_antecedentes_familiares belongsTo pacientes via idPaciente
  idPaciente_paciente!: pacientes;
  getIdPaciente_paciente!: Sequelize.BelongsToGetAssociationMixin<pacientes>;
  setIdPaciente_paciente!: Sequelize.BelongsToSetAssociationMixin<pacientes, pacientesId>;
  createIdPaciente_paciente!: Sequelize.BelongsToCreateAssociationMixin<pacientes>;

  static initModel(sequelize: Sequelize.Sequelize): typeof paciente_antecedentes_familiares {
    return paciente_antecedentes_familiares.init({
    idAntecedenteFamiliar: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombreEnfermedad: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    detalles: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    lazoFamiliar: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    idPaciente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pacientes',
        key: 'idPaciente'
      }
    }
  }, {
    sequelize,
    tableName: 'paciente_antecedentes_familiares',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idAntecedenteFamiliar" },
        ]
      },
      {
        name: "idPaciente",
        using: "BTREE",
        fields: [
          { name: "idPaciente" },
        ]
      },
    ]
  });
  }
}
