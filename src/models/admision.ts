import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { hospital_camas, hospital_camasId } from './hospital_camas';
import type { pacientes, pacientesId } from './pacientes';

export interface admisionAttributes {
  idAdmision: number;
  fechaDeAdmision: string;
  tipoDeAdmision: string;
  estado: string;
  motivoDeInternacion: string;
  idPaciente?: number;
  idCama?: number;
}

export type admisionPk = "idAdmision";
export type admisionId = admision[admisionPk];
export type admisionOptionalAttributes = "idAdmision" | "idPaciente" | "idCama";
export type admisionCreationAttributes = Optional<admisionAttributes, admisionOptionalAttributes>;

export class admision extends Model<admisionAttributes, admisionCreationAttributes> implements admisionAttributes {
  idAdmision!: number;
  fechaDeAdmision!: string;
  tipoDeAdmision!: string;
  estado!: string;
  motivoDeInternacion!: string;
  idPaciente?: number;
  idCama?: number;

  // admision belongsTo hospital_camas via idCama
  idCama_hospital_cama!: hospital_camas;
  getIdCama_hospital_cama!: Sequelize.BelongsToGetAssociationMixin<hospital_camas>;
  setIdCama_hospital_cama!: Sequelize.BelongsToSetAssociationMixin<hospital_camas, hospital_camasId>;
  createIdCama_hospital_cama!: Sequelize.BelongsToCreateAssociationMixin<hospital_camas>;
  // admision belongsTo pacientes via idPaciente
  idPaciente_paciente!: pacientes;
  getIdPaciente_paciente!: Sequelize.BelongsToGetAssociationMixin<pacientes>;
  setIdPaciente_paciente!: Sequelize.BelongsToSetAssociationMixin<pacientes, pacientesId>;
  createIdPaciente_paciente!: Sequelize.BelongsToCreateAssociationMixin<pacientes>;

  static initModel(sequelize: Sequelize.Sequelize): typeof admision {
    return admision.init({
    idAdmision: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fechaDeAdmision: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    tipoDeAdmision: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    motivoDeInternacion: {
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
    idCama: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'hospital_camas',
        key: 'idCama'
      }
    }
  }, {
    sequelize,
    tableName: 'admision',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idAdmision" },
        ]
      },
      {
        name: "idCama",
        using: "BTREE",
        fields: [
          { name: "idCama" },
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
