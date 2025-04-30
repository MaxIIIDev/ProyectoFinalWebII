import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { paciente_tratamientos, paciente_tratamientosId } from './paciente_tratamientos';
import type { pacientes, pacientesId } from './pacientes';

export interface paciente_alergiasAttributes {
  idAlergia: number;
  nombre: string;
  descripcion: string;
  idPaciente?: number;
  idTratamiento?: number;
}

export type paciente_alergiasPk = "idAlergia";
export type paciente_alergiasId = paciente_alergias[paciente_alergiasPk];
export type paciente_alergiasOptionalAttributes = "idAlergia" | "idPaciente" | "idTratamiento";
export type paciente_alergiasCreationAttributes = Optional<paciente_alergiasAttributes, paciente_alergiasOptionalAttributes>;

export class paciente_alergias extends Model<paciente_alergiasAttributes, paciente_alergiasCreationAttributes> implements paciente_alergiasAttributes {
  idAlergia!: number;
  nombre!: string;
  descripcion!: string;
  idPaciente?: number;
  idTratamiento?: number;

  // paciente_alergias belongsTo paciente_tratamientos via idTratamiento
  idTratamiento_paciente_tratamiento!: paciente_tratamientos;
  getIdTratamiento_paciente_tratamiento!: Sequelize.BelongsToGetAssociationMixin<paciente_tratamientos>;
  setIdTratamiento_paciente_tratamiento!: Sequelize.BelongsToSetAssociationMixin<paciente_tratamientos, paciente_tratamientosId>;
  createIdTratamiento_paciente_tratamiento!: Sequelize.BelongsToCreateAssociationMixin<paciente_tratamientos>;
  // paciente_alergias belongsTo pacientes via idPaciente
  idPaciente_paciente!: pacientes;
  getIdPaciente_paciente!: Sequelize.BelongsToGetAssociationMixin<pacientes>;
  setIdPaciente_paciente!: Sequelize.BelongsToSetAssociationMixin<pacientes, pacientesId>;
  createIdPaciente_paciente!: Sequelize.BelongsToCreateAssociationMixin<pacientes>;

  static initModel(sequelize: Sequelize.Sequelize): typeof paciente_alergias {
    return paciente_alergias.init({
    idAlergia: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: false
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
    tableName: 'paciente_alergias',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idAlergia" },
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
