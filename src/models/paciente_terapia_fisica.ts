import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { paciente_tratamientos, paciente_tratamientosId } from './paciente_tratamientos';
import type { pacientes, pacientesId } from './pacientes';

export interface paciente_terapia_fisicaAttributes {
  idTerapiaFisica: number;
  fecha: string;
  nombre: string;
  duracion: number;
  idPaciente?: number;
  idTratamiento?: number;
}

export type paciente_terapia_fisicaPk = "idTerapiaFisica";
export type paciente_terapia_fisicaId = paciente_terapia_fisica[paciente_terapia_fisicaPk];
export type paciente_terapia_fisicaOptionalAttributes = "idTerapiaFisica" | "idPaciente" | "idTratamiento";
export type paciente_terapia_fisicaCreationAttributes = Optional<paciente_terapia_fisicaAttributes, paciente_terapia_fisicaOptionalAttributes>;

export class paciente_terapia_fisica extends Model<paciente_terapia_fisicaAttributes, paciente_terapia_fisicaCreationAttributes> implements paciente_terapia_fisicaAttributes {
  idTerapiaFisica!: number;
  fecha!: string;
  nombre!: string;
  duracion!: number;
  idPaciente?: number;
  idTratamiento?: number;

  // paciente_terapia_fisica belongsTo paciente_tratamientos via idTratamiento
  idTratamiento_paciente_tratamiento!: paciente_tratamientos;
  getIdTratamiento_paciente_tratamiento!: Sequelize.BelongsToGetAssociationMixin<paciente_tratamientos>;
  setIdTratamiento_paciente_tratamiento!: Sequelize.BelongsToSetAssociationMixin<paciente_tratamientos, paciente_tratamientosId>;
  createIdTratamiento_paciente_tratamiento!: Sequelize.BelongsToCreateAssociationMixin<paciente_tratamientos>;
  // paciente_terapia_fisica belongsTo pacientes via idPaciente
  idPaciente_paciente!: pacientes;
  getIdPaciente_paciente!: Sequelize.BelongsToGetAssociationMixin<pacientes>;
  setIdPaciente_paciente!: Sequelize.BelongsToSetAssociationMixin<pacientes, pacientesId>;
  createIdPaciente_paciente!: Sequelize.BelongsToCreateAssociationMixin<pacientes>;

  static initModel(sequelize: Sequelize.Sequelize): typeof paciente_terapia_fisica {
    return paciente_terapia_fisica.init({
    idTerapiaFisica: {
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
    duracion: {
      type: DataTypes.INTEGER,
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
    tableName: 'paciente_terapia_fisica',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idTerapiaFisica" },
        ]
      },
      {
        name: "idTratamiento",
        using: "BTREE",
        fields: [
          { name: "idTratamiento" },
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
