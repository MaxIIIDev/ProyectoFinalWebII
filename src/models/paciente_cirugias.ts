import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { medicos, medicosId } from './medicos';
import type { pacientes, pacientesId } from './pacientes';

export interface paciente_cirugiasAttributes {
  idCirugia: number;
  fecha: string;
  nombre: string;
  descripcion: string;
  idMedico?: number;
  idPaciente?: number;
}

export type paciente_cirugiasPk = "idCirugia";
export type paciente_cirugiasId = paciente_cirugias[paciente_cirugiasPk];
export type paciente_cirugiasOptionalAttributes = "idCirugia" | "idMedico" | "idPaciente";
export type paciente_cirugiasCreationAttributes = Optional<paciente_cirugiasAttributes, paciente_cirugiasOptionalAttributes>;

export class paciente_cirugias extends Model<paciente_cirugiasAttributes, paciente_cirugiasCreationAttributes> implements paciente_cirugiasAttributes {
  idCirugia!: number;
  fecha!: string;
  nombre!: string;
  descripcion!: string;
  idMedico?: number;
  idPaciente?: number;

  // paciente_cirugias belongsTo medicos via idMedico
  idMedico_medico!: medicos;
  getIdMedico_medico!: Sequelize.BelongsToGetAssociationMixin<medicos>;
  setIdMedico_medico!: Sequelize.BelongsToSetAssociationMixin<medicos, medicosId>;
  createIdMedico_medico!: Sequelize.BelongsToCreateAssociationMixin<medicos>;
  // paciente_cirugias belongsTo pacientes via idPaciente
  idPaciente_paciente!: pacientes;
  getIdPaciente_paciente!: Sequelize.BelongsToGetAssociationMixin<pacientes>;
  setIdPaciente_paciente!: Sequelize.BelongsToSetAssociationMixin<pacientes, pacientesId>;
  createIdPaciente_paciente!: Sequelize.BelongsToCreateAssociationMixin<pacientes>;

  static initModel(sequelize: Sequelize.Sequelize): typeof paciente_cirugias {
    return paciente_cirugias.init({
    idCirugia: {
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
      type: DataTypes.STRING(250),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(250),
      allowNull: false
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
    }
  }, {
    sequelize,
    tableName: 'paciente_cirugias',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCirugia" },
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
        name: "idMedico",
        using: "BTREE",
        fields: [
          { name: "idMedico" },
        ]
      },
    ]
  });
  }
}
