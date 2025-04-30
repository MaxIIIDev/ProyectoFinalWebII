import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { medicos, medicosId } from './medicos';
import type { paciente_pruebas_diagnosticas, paciente_pruebas_diagnosticasId } from './paciente_pruebas_diagnosticas';
import type { paciente_tratamientos, paciente_tratamientosId } from './paciente_tratamientos';
import type { pacientes, pacientesId } from './pacientes';

export interface paciente_diagnosticosAttributes {
  idDiagnostico: number;
  fecha: string;
  nombre: string;
  sintomas: string;
  detalles?: string;
  idMedico?: number;
  idPaciente?: number;
  idTratamiento?: number;
}

export type paciente_diagnosticosPk = "idDiagnostico";
export type paciente_diagnosticosId = paciente_diagnosticos[paciente_diagnosticosPk];
export type paciente_diagnosticosOptionalAttributes = "idDiagnostico" | "detalles" | "idMedico" | "idPaciente" | "idTratamiento";
export type paciente_diagnosticosCreationAttributes = Optional<paciente_diagnosticosAttributes, paciente_diagnosticosOptionalAttributes>;

export class paciente_diagnosticos extends Model<paciente_diagnosticosAttributes, paciente_diagnosticosCreationAttributes> implements paciente_diagnosticosAttributes {
  idDiagnostico!: number;
  fecha!: string;
  nombre!: string;
  sintomas!: string;
  detalles?: string;
  idMedico?: number;
  idPaciente?: number;
  idTratamiento?: number;

  // paciente_diagnosticos belongsTo medicos via idMedico
  idMedico_medico!: medicos;
  getIdMedico_medico!: Sequelize.BelongsToGetAssociationMixin<medicos>;
  setIdMedico_medico!: Sequelize.BelongsToSetAssociationMixin<medicos, medicosId>;
  createIdMedico_medico!: Sequelize.BelongsToCreateAssociationMixin<medicos>;
  // paciente_diagnosticos hasMany paciente_pruebas_diagnosticas via idDiagnostico
  paciente_pruebas_diagnosticas!: paciente_pruebas_diagnosticas[];
  getPaciente_pruebas_diagnosticas!: Sequelize.HasManyGetAssociationsMixin<paciente_pruebas_diagnosticas>;
  setPaciente_pruebas_diagnosticas!: Sequelize.HasManySetAssociationsMixin<paciente_pruebas_diagnosticas, paciente_pruebas_diagnosticasId>;
  addPaciente_pruebas_diagnostica!: Sequelize.HasManyAddAssociationMixin<paciente_pruebas_diagnosticas, paciente_pruebas_diagnosticasId>;
  addPaciente_pruebas_diagnosticas!: Sequelize.HasManyAddAssociationsMixin<paciente_pruebas_diagnosticas, paciente_pruebas_diagnosticasId>;
  createPaciente_pruebas_diagnostica!: Sequelize.HasManyCreateAssociationMixin<paciente_pruebas_diagnosticas>;
  removePaciente_pruebas_diagnostica!: Sequelize.HasManyRemoveAssociationMixin<paciente_pruebas_diagnosticas, paciente_pruebas_diagnosticasId>;
  removePaciente_pruebas_diagnosticas!: Sequelize.HasManyRemoveAssociationsMixin<paciente_pruebas_diagnosticas, paciente_pruebas_diagnosticasId>;
  hasPaciente_pruebas_diagnostica!: Sequelize.HasManyHasAssociationMixin<paciente_pruebas_diagnosticas, paciente_pruebas_diagnosticasId>;
  hasPaciente_pruebas_diagnosticas!: Sequelize.HasManyHasAssociationsMixin<paciente_pruebas_diagnosticas, paciente_pruebas_diagnosticasId>;
  countPaciente_pruebas_diagnosticas!: Sequelize.HasManyCountAssociationsMixin;
  // paciente_diagnosticos belongsTo paciente_tratamientos via idTratamiento
  idTratamiento_paciente_tratamiento!: paciente_tratamientos;
  getIdTratamiento_paciente_tratamiento!: Sequelize.BelongsToGetAssociationMixin<paciente_tratamientos>;
  setIdTratamiento_paciente_tratamiento!: Sequelize.BelongsToSetAssociationMixin<paciente_tratamientos, paciente_tratamientosId>;
  createIdTratamiento_paciente_tratamiento!: Sequelize.BelongsToCreateAssociationMixin<paciente_tratamientos>;
  // paciente_diagnosticos belongsTo pacientes via idPaciente
  idPaciente_paciente!: pacientes;
  getIdPaciente_paciente!: Sequelize.BelongsToGetAssociationMixin<pacientes>;
  setIdPaciente_paciente!: Sequelize.BelongsToSetAssociationMixin<pacientes, pacientesId>;
  createIdPaciente_paciente!: Sequelize.BelongsToCreateAssociationMixin<pacientes>;

  static initModel(sequelize: Sequelize.Sequelize): typeof paciente_diagnosticos {
    return paciente_diagnosticos.init({
    idDiagnostico: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    sintomas: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    detalles: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    idMedico: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'medicos',
        key: 'idMedico'
      }
    },
    idPaciente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pacientes',
        key: 'idPaciente'
      }
    },
    idTratamiento: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'paciente_tratamientos',
        key: 'idTratamiento'
      }
    }
  }, {
    sequelize,
    tableName: 'paciente_diagnosticos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idDiagnostico" },
        ]
      },
      {
        name: "idMedico",
        using: "BTREE",
        fields: [
          { name: "idMedico" },
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
        name: "idTratamiento",
        using: "BTREE",
        fields: [
          { name: "idTratamiento" },
        ]
      },
    ]
  });
  }
}
