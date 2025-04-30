import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { medicamentos, medicamentosId } from './medicamentos';
import type { medicos, medicosId } from './medicos';
import type { pacientes, pacientesId } from './pacientes';

export interface paciente_recetasAttributes {
  idReceta: number;
  fecha: string;
  idPaciente?: number;
  idMedico?: number;
  idMedicamento?: number;
}

export type paciente_recetasPk = "idReceta";
export type paciente_recetasId = paciente_recetas[paciente_recetasPk];
export type paciente_recetasOptionalAttributes = "idReceta" | "idPaciente" | "idMedico" | "idMedicamento";
export type paciente_recetasCreationAttributes = Optional<paciente_recetasAttributes, paciente_recetasOptionalAttributes>;

export class paciente_recetas extends Model<paciente_recetasAttributes, paciente_recetasCreationAttributes> implements paciente_recetasAttributes {
  idReceta!: number;
  fecha!: string;
  idPaciente?: number;
  idMedico?: number;
  idMedicamento?: number;

  // paciente_recetas belongsTo medicamentos via idMedicamento
  idMedicamento_medicamento!: medicamentos;
  getIdMedicamento_medicamento!: Sequelize.BelongsToGetAssociationMixin<medicamentos>;
  setIdMedicamento_medicamento!: Sequelize.BelongsToSetAssociationMixin<medicamentos, medicamentosId>;
  createIdMedicamento_medicamento!: Sequelize.BelongsToCreateAssociationMixin<medicamentos>;
  // paciente_recetas belongsTo medicos via idMedico
  idMedico_medico!: medicos;
  getIdMedico_medico!: Sequelize.BelongsToGetAssociationMixin<medicos>;
  setIdMedico_medico!: Sequelize.BelongsToSetAssociationMixin<medicos, medicosId>;
  createIdMedico_medico!: Sequelize.BelongsToCreateAssociationMixin<medicos>;
  // paciente_recetas belongsTo pacientes via idPaciente
  idPaciente_paciente!: pacientes;
  getIdPaciente_paciente!: Sequelize.BelongsToGetAssociationMixin<pacientes>;
  setIdPaciente_paciente!: Sequelize.BelongsToSetAssociationMixin<pacientes, pacientesId>;
  createIdPaciente_paciente!: Sequelize.BelongsToCreateAssociationMixin<pacientes>;

  static initModel(sequelize: Sequelize.Sequelize): typeof paciente_recetas {
    return paciente_recetas.init({
    idReceta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
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
    },
    idMedicamento: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'medicamentos',
        key: 'idMedicamento'
      }
    }
  }, {
    sequelize,
    tableName: 'paciente_recetas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idReceta" },
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
        name: "idMedicamento",
        using: "BTREE",
        fields: [
          { name: "idMedicamento" },
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
