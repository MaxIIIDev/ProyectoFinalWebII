import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { enfermeros, enfermerosId } from './enfermeros';
import type { pacientes, pacientesId } from './pacientes';

export interface paciente_evaluacionfisicaAttributes {
  idEvaluacionFisica: number;
  fecha: string;
  presionArterial: number;
  frecuenciaCardiaca: number;
  temperaturaCorporal: number;
  colorDePiel?: string;
  respuestaAEstimulos?: string;
  idPaciente?: number;
  idEnfermero?: number;
}

export type paciente_evaluacionfisicaPk = "idEvaluacionFisica";
export type paciente_evaluacionfisicaId = paciente_evaluacionfisica[paciente_evaluacionfisicaPk];
export type paciente_evaluacionfisicaOptionalAttributes = "idEvaluacionFisica" | "colorDePiel" | "respuestaAEstimulos" | "idPaciente" | "idEnfermero";
export type paciente_evaluacionfisicaCreationAttributes = Optional<paciente_evaluacionfisicaAttributes, paciente_evaluacionfisicaOptionalAttributes>;

export class paciente_evaluacionfisica extends Model<paciente_evaluacionfisicaAttributes, paciente_evaluacionfisicaCreationAttributes> implements paciente_evaluacionfisicaAttributes {
  idEvaluacionFisica!: number;
  fecha!: string;
  presionArterial!: number;
  frecuenciaCardiaca!: number;
  temperaturaCorporal!: number;
  colorDePiel?: string;
  respuestaAEstimulos?: string;
  idPaciente?: number;
  idEnfermero?: number;

  // paciente_evaluacionfisica belongsTo enfermeros via idEnfermero
  idEnfermero_enfermero!: enfermeros;
  getIdEnfermero_enfermero!: Sequelize.BelongsToGetAssociationMixin<enfermeros>;
  setIdEnfermero_enfermero!: Sequelize.BelongsToSetAssociationMixin<enfermeros, enfermerosId>;
  createIdEnfermero_enfermero!: Sequelize.BelongsToCreateAssociationMixin<enfermeros>;
  // paciente_evaluacionfisica belongsTo pacientes via idPaciente
  idPaciente_paciente!: pacientes;
  getIdPaciente_paciente!: Sequelize.BelongsToGetAssociationMixin<pacientes>;
  setIdPaciente_paciente!: Sequelize.BelongsToSetAssociationMixin<pacientes, pacientesId>;
  createIdPaciente_paciente!: Sequelize.BelongsToCreateAssociationMixin<pacientes>;

  static initModel(sequelize: Sequelize.Sequelize): typeof paciente_evaluacionfisica {
    return paciente_evaluacionfisica.init({
    idEvaluacionFisica: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    presionArterial: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    frecuenciaCardiaca: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    temperaturaCorporal: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    colorDePiel: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    respuestaAEstimulos: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    idPaciente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pacientes',
        key: 'idPaciente'
      }
    },
    idEnfermero: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'enfermeros',
        key: 'idEnfermero'
      }
    }
  }, {
    sequelize,
    tableName: 'paciente_evaluacionfisica',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idEvaluacionFisica" },
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
        name: "idEnfermero",
        using: "BTREE",
        fields: [
          { name: "idEnfermero" },
        ]
      },
    ]
  });
  }
}
