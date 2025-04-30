import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { paciente_diagnosticos, paciente_diagnosticosId } from './paciente_diagnosticos';
import type { pacientes, pacientesId } from './pacientes';

export interface paciente_pruebas_diagnosticasAttributes {
  idPruebaDiagnostica: number;
  nombre: string;
  resultado: string;
  idDiagnostico?: number;
  idPaciente?: number;
}

export type paciente_pruebas_diagnosticasPk = "idPruebaDiagnostica";
export type paciente_pruebas_diagnosticasId = paciente_pruebas_diagnosticas[paciente_pruebas_diagnosticasPk];
export type paciente_pruebas_diagnosticasOptionalAttributes = "idPruebaDiagnostica" | "idDiagnostico" | "idPaciente";
export type paciente_pruebas_diagnosticasCreationAttributes = Optional<paciente_pruebas_diagnosticasAttributes, paciente_pruebas_diagnosticasOptionalAttributes>;

export class paciente_pruebas_diagnosticas extends Model<paciente_pruebas_diagnosticasAttributes, paciente_pruebas_diagnosticasCreationAttributes> implements paciente_pruebas_diagnosticasAttributes {
  idPruebaDiagnostica!: number;
  nombre!: string;
  resultado!: string;
  idDiagnostico?: number;
  idPaciente?: number;

  // paciente_pruebas_diagnosticas belongsTo paciente_diagnosticos via idDiagnostico
  idDiagnostico_paciente_diagnostico!: paciente_diagnosticos;
  getIdDiagnostico_paciente_diagnostico!: Sequelize.BelongsToGetAssociationMixin<paciente_diagnosticos>;
  setIdDiagnostico_paciente_diagnostico!: Sequelize.BelongsToSetAssociationMixin<paciente_diagnosticos, paciente_diagnosticosId>;
  createIdDiagnostico_paciente_diagnostico!: Sequelize.BelongsToCreateAssociationMixin<paciente_diagnosticos>;
  // paciente_pruebas_diagnosticas belongsTo pacientes via idPaciente
  idPaciente_paciente!: pacientes;
  getIdPaciente_paciente!: Sequelize.BelongsToGetAssociationMixin<pacientes>;
  setIdPaciente_paciente!: Sequelize.BelongsToSetAssociationMixin<pacientes, pacientesId>;
  createIdPaciente_paciente!: Sequelize.BelongsToCreateAssociationMixin<pacientes>;

  static initModel(sequelize: Sequelize.Sequelize): typeof paciente_pruebas_diagnosticas {
    return paciente_pruebas_diagnosticas.init({
    idPruebaDiagnostica: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    resultado: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    idDiagnostico: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'paciente_diagnosticos',
        key: 'idDiagnostico'
      }
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
    tableName: 'paciente_pruebas_diagnosticas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idPruebaDiagnostica" },
        ]
      },
      {
        name: "idPaciente",
        using: "BTREE",
        fields: [
          { name: "idPaciente" },
        ]
      },
      {
        name: "idDiagnostico",
        using: "BTREE",
        fields: [
          { name: "idDiagnostico" },
        ]
      },
    ]
  });
  }
}
