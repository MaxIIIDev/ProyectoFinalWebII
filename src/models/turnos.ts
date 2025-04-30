import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { medicos, medicosId } from './medicos';
import type { pacientes, pacientesId } from './pacientes';

export interface turnosAttributes {
  idTurno: number;
  fecha: string;
  horario: string;
  motivo: string;
  idPaciente?: number;
  idMedico?: number;
}

export type turnosPk = "idTurno";
export type turnosId = turnos[turnosPk];
export type turnosOptionalAttributes = "idTurno" | "idPaciente" | "idMedico";
export type turnosCreationAttributes = Optional<turnosAttributes, turnosOptionalAttributes>;

export class turnos extends Model<turnosAttributes, turnosCreationAttributes> implements turnosAttributes {
  idTurno!: number;
  fecha!: string;
  horario!: string;
  motivo!: string;
  idPaciente?: number;
  idMedico?: number;

  // turnos belongsTo medicos via idMedico
  idMedico_medico!: medicos;
  getIdMedico_medico!: Sequelize.BelongsToGetAssociationMixin<medicos>;
  setIdMedico_medico!: Sequelize.BelongsToSetAssociationMixin<medicos, medicosId>;
  createIdMedico_medico!: Sequelize.BelongsToCreateAssociationMixin<medicos>;
  // turnos belongsTo pacientes via idPaciente
  idPaciente_paciente!: pacientes;
  getIdPaciente_paciente!: Sequelize.BelongsToGetAssociationMixin<pacientes>;
  setIdPaciente_paciente!: Sequelize.BelongsToSetAssociationMixin<pacientes, pacientesId>;
  createIdPaciente_paciente!: Sequelize.BelongsToCreateAssociationMixin<pacientes>;

  static initModel(sequelize: Sequelize.Sequelize): typeof turnos {
    return turnos.init({
    idTurno: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    horario: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    motivo: {
      type: DataTypes.STRING(200),
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
    idMedico: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'medicos',
        key: 'idMedico'
      }
    }
  }, {
    sequelize,
    tableName: 'turnos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idTurno" },
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
