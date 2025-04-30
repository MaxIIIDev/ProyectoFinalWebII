import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { enfermeros, enfermerosId } from './enfermeros';
import type { medicamentos, medicamentosId } from './medicamentos';
import type { paciente_alergias, paciente_alergiasId } from './paciente_alergias';
import type { paciente_diagnosticos, paciente_diagnosticosId } from './paciente_diagnosticos';
import type { paciente_terapia_fisica, paciente_terapia_fisicaId } from './paciente_terapia_fisica';
import type { pacientes, pacientesId } from './pacientes';

export interface paciente_tratamientosAttributes {
  idTratamiento: number;
  tipo: string;
  detalle: string;
  cantidadSuministrada: number;
  fechaDeInicio: string;
  fechaDeFin?: string;
  idPaciente?: number;
  idMedicamento?: number;
  idEnfermero?: number;
}

export type paciente_tratamientosPk = "idTratamiento";
export type paciente_tratamientosId = paciente_tratamientos[paciente_tratamientosPk];
export type paciente_tratamientosOptionalAttributes = "idTratamiento" | "fechaDeFin" | "idPaciente" | "idMedicamento" | "idEnfermero";
export type paciente_tratamientosCreationAttributes = Optional<paciente_tratamientosAttributes, paciente_tratamientosOptionalAttributes>;

export class paciente_tratamientos extends Model<paciente_tratamientosAttributes, paciente_tratamientosCreationAttributes> implements paciente_tratamientosAttributes {
  idTratamiento!: number;
  tipo!: string;
  detalle!: string;
  cantidadSuministrada!: number;
  fechaDeInicio!: string;
  fechaDeFin?: string;
  idPaciente?: number;
  idMedicamento?: number;
  idEnfermero?: number;

  // paciente_tratamientos belongsTo enfermeros via idEnfermero
  idEnfermero_enfermero!: enfermeros;
  getIdEnfermero_enfermero!: Sequelize.BelongsToGetAssociationMixin<enfermeros>;
  setIdEnfermero_enfermero!: Sequelize.BelongsToSetAssociationMixin<enfermeros, enfermerosId>;
  createIdEnfermero_enfermero!: Sequelize.BelongsToCreateAssociationMixin<enfermeros>;
  // paciente_tratamientos belongsTo medicamentos via idMedicamento
  idMedicamento_medicamento!: medicamentos;
  getIdMedicamento_medicamento!: Sequelize.BelongsToGetAssociationMixin<medicamentos>;
  setIdMedicamento_medicamento!: Sequelize.BelongsToSetAssociationMixin<medicamentos, medicamentosId>;
  createIdMedicamento_medicamento!: Sequelize.BelongsToCreateAssociationMixin<medicamentos>;
  // paciente_tratamientos hasMany paciente_alergias via idTratamiento
  paciente_alergia!: paciente_alergias[];
  getPaciente_alergia!: Sequelize.HasManyGetAssociationsMixin<paciente_alergias>;
  setPaciente_alergia!: Sequelize.HasManySetAssociationsMixin<paciente_alergias, paciente_alergiasId>;
  addPaciente_alergium!: Sequelize.HasManyAddAssociationMixin<paciente_alergias, paciente_alergiasId>;
  addPaciente_alergia!: Sequelize.HasManyAddAssociationsMixin<paciente_alergias, paciente_alergiasId>;
  createPaciente_alergium!: Sequelize.HasManyCreateAssociationMixin<paciente_alergias>;
  removePaciente_alergium!: Sequelize.HasManyRemoveAssociationMixin<paciente_alergias, paciente_alergiasId>;
  removePaciente_alergia!: Sequelize.HasManyRemoveAssociationsMixin<paciente_alergias, paciente_alergiasId>;
  hasPaciente_alergium!: Sequelize.HasManyHasAssociationMixin<paciente_alergias, paciente_alergiasId>;
  hasPaciente_alergia!: Sequelize.HasManyHasAssociationsMixin<paciente_alergias, paciente_alergiasId>;
  countPaciente_alergia!: Sequelize.HasManyCountAssociationsMixin;
  // paciente_tratamientos hasMany paciente_diagnosticos via idTratamiento
  paciente_diagnosticos!: paciente_diagnosticos[];
  getPaciente_diagnosticos!: Sequelize.HasManyGetAssociationsMixin<paciente_diagnosticos>;
  setPaciente_diagnosticos!: Sequelize.HasManySetAssociationsMixin<paciente_diagnosticos, paciente_diagnosticosId>;
  addPaciente_diagnostico!: Sequelize.HasManyAddAssociationMixin<paciente_diagnosticos, paciente_diagnosticosId>;
  addPaciente_diagnosticos!: Sequelize.HasManyAddAssociationsMixin<paciente_diagnosticos, paciente_diagnosticosId>;
  createPaciente_diagnostico!: Sequelize.HasManyCreateAssociationMixin<paciente_diagnosticos>;
  removePaciente_diagnostico!: Sequelize.HasManyRemoveAssociationMixin<paciente_diagnosticos, paciente_diagnosticosId>;
  removePaciente_diagnosticos!: Sequelize.HasManyRemoveAssociationsMixin<paciente_diagnosticos, paciente_diagnosticosId>;
  hasPaciente_diagnostico!: Sequelize.HasManyHasAssociationMixin<paciente_diagnosticos, paciente_diagnosticosId>;
  hasPaciente_diagnosticos!: Sequelize.HasManyHasAssociationsMixin<paciente_diagnosticos, paciente_diagnosticosId>;
  countPaciente_diagnosticos!: Sequelize.HasManyCountAssociationsMixin;
  // paciente_tratamientos hasMany paciente_terapia_fisica via idTratamiento
  paciente_terapia_fisicas!: paciente_terapia_fisica[];
  getPaciente_terapia_fisicas!: Sequelize.HasManyGetAssociationsMixin<paciente_terapia_fisica>;
  setPaciente_terapia_fisicas!: Sequelize.HasManySetAssociationsMixin<paciente_terapia_fisica, paciente_terapia_fisicaId>;
  addPaciente_terapia_fisica!: Sequelize.HasManyAddAssociationMixin<paciente_terapia_fisica, paciente_terapia_fisicaId>;
  addPaciente_terapia_fisicas!: Sequelize.HasManyAddAssociationsMixin<paciente_terapia_fisica, paciente_terapia_fisicaId>;
  createPaciente_terapia_fisica!: Sequelize.HasManyCreateAssociationMixin<paciente_terapia_fisica>;
  removePaciente_terapia_fisica!: Sequelize.HasManyRemoveAssociationMixin<paciente_terapia_fisica, paciente_terapia_fisicaId>;
  removePaciente_terapia_fisicas!: Sequelize.HasManyRemoveAssociationsMixin<paciente_terapia_fisica, paciente_terapia_fisicaId>;
  hasPaciente_terapia_fisica!: Sequelize.HasManyHasAssociationMixin<paciente_terapia_fisica, paciente_terapia_fisicaId>;
  hasPaciente_terapia_fisicas!: Sequelize.HasManyHasAssociationsMixin<paciente_terapia_fisica, paciente_terapia_fisicaId>;
  countPaciente_terapia_fisicas!: Sequelize.HasManyCountAssociationsMixin;
  // paciente_tratamientos belongsTo pacientes via idPaciente
  idPaciente_paciente!: pacientes;
  getIdPaciente_paciente!: Sequelize.BelongsToGetAssociationMixin<pacientes>;
  setIdPaciente_paciente!: Sequelize.BelongsToSetAssociationMixin<pacientes, pacientesId>;
  createIdPaciente_paciente!: Sequelize.BelongsToCreateAssociationMixin<pacientes>;

  static initModel(sequelize: Sequelize.Sequelize): typeof paciente_tratamientos {
    return paciente_tratamientos.init({
    idTratamiento: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    detalle: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    cantidadSuministrada: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    fechaDeInicio: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fechaDeFin: {
      type: DataTypes.DATEONLY,
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
    idMedicamento: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'medicamentos',
        key: 'idMedicamento'
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
    tableName: 'paciente_tratamientos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
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
      {
        name: "idMedicamento",
        using: "BTREE",
        fields: [
          { name: "idMedicamento" },
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
