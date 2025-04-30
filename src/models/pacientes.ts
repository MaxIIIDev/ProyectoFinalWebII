import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { admision, admisionId } from './admision';
import type { paciente_alergias, paciente_alergiasId } from './paciente_alergias';
import type { paciente_antecedentes_familiares, paciente_antecedentes_familiaresId } from './paciente_antecedentes_familiares';
import type { paciente_cirugias, paciente_cirugiasId } from './paciente_cirugias';
import type { paciente_diagnosticos, paciente_diagnosticosId } from './paciente_diagnosticos';
import type { paciente_evaluacionfisica, paciente_evaluacionfisicaId } from './paciente_evaluacionfisica';
import type { paciente_pruebas_diagnosticas, paciente_pruebas_diagnosticasId } from './paciente_pruebas_diagnosticas';
import type { paciente_recetas, paciente_recetasId } from './paciente_recetas';
import type { paciente_seguromedico, paciente_seguromedicoId } from './paciente_seguromedico';
import type { paciente_terapia_fisica, paciente_terapia_fisicaId } from './paciente_terapia_fisica';
import type { paciente_tratamientos, paciente_tratamientosId } from './paciente_tratamientos';
import type { turnos, turnosId } from './turnos';

export interface pacientesAttributes {
  idPaciente: number;
  nombre: string;
  apellido: string;
  dni: number;
  fecha_nac: string;
  edad: number;
  peso?: number;
  genero: string;
  telefono: number;
  telefonoEmergencia?: number;
  direccion?: string;
  idSeguroMedico?: number;
  tipoSanguineo?: string;
}

export type pacientesPk = "idPaciente";
export type pacientesId = pacientes[pacientesPk];
export type pacientesOptionalAttributes = "idPaciente" | "peso" | "telefonoEmergencia" | "direccion" | "idSeguroMedico" | "tipoSanguineo";
export type pacientesCreationAttributes = Optional<pacientesAttributes, pacientesOptionalAttributes>;

export class pacientes extends Model<pacientesAttributes, pacientesCreationAttributes> implements pacientesAttributes {
  idPaciente!: number;
  nombre!: string;
  apellido!: string;
  dni!: number;
  fecha_nac!: string;
  edad!: number;
  peso?: number;
  genero!: string;
  telefono!: number;
  telefonoEmergencia?: number;
  direccion?: string;
  idSeguroMedico?: number;
  tipoSanguineo?: string;

  // pacientes belongsTo paciente_seguromedico via idSeguroMedico
  idSeguroMedico_paciente_seguromedico!: paciente_seguromedico;
  getIdSeguroMedico_paciente_seguromedico!: Sequelize.BelongsToGetAssociationMixin<paciente_seguromedico>;
  setIdSeguroMedico_paciente_seguromedico!: Sequelize.BelongsToSetAssociationMixin<paciente_seguromedico, paciente_seguromedicoId>;
  createIdSeguroMedico_paciente_seguromedico!: Sequelize.BelongsToCreateAssociationMixin<paciente_seguromedico>;
  // pacientes hasMany admision via idPaciente
  admisions!: admision[];
  getAdmisions!: Sequelize.HasManyGetAssociationsMixin<admision>;
  setAdmisions!: Sequelize.HasManySetAssociationsMixin<admision, admisionId>;
  addAdmision!: Sequelize.HasManyAddAssociationMixin<admision, admisionId>;
  addAdmisions!: Sequelize.HasManyAddAssociationsMixin<admision, admisionId>;
  createAdmision!: Sequelize.HasManyCreateAssociationMixin<admision>;
  removeAdmision!: Sequelize.HasManyRemoveAssociationMixin<admision, admisionId>;
  removeAdmisions!: Sequelize.HasManyRemoveAssociationsMixin<admision, admisionId>;
  hasAdmision!: Sequelize.HasManyHasAssociationMixin<admision, admisionId>;
  hasAdmisions!: Sequelize.HasManyHasAssociationsMixin<admision, admisionId>;
  countAdmisions!: Sequelize.HasManyCountAssociationsMixin;
  // pacientes hasMany paciente_alergias via idPaciente
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
  // pacientes hasMany paciente_antecedentes_familiares via idPaciente
  paciente_antecedentes_familiares!: paciente_antecedentes_familiares[];
  getPaciente_antecedentes_familiares!: Sequelize.HasManyGetAssociationsMixin<paciente_antecedentes_familiares>;
  setPaciente_antecedentes_familiares!: Sequelize.HasManySetAssociationsMixin<paciente_antecedentes_familiares, paciente_antecedentes_familiaresId>;
  addPaciente_antecedentes_familiare!: Sequelize.HasManyAddAssociationMixin<paciente_antecedentes_familiares, paciente_antecedentes_familiaresId>;
  addPaciente_antecedentes_familiares!: Sequelize.HasManyAddAssociationsMixin<paciente_antecedentes_familiares, paciente_antecedentes_familiaresId>;
  createPaciente_antecedentes_familiare!: Sequelize.HasManyCreateAssociationMixin<paciente_antecedentes_familiares>;
  removePaciente_antecedentes_familiare!: Sequelize.HasManyRemoveAssociationMixin<paciente_antecedentes_familiares, paciente_antecedentes_familiaresId>;
  removePaciente_antecedentes_familiares!: Sequelize.HasManyRemoveAssociationsMixin<paciente_antecedentes_familiares, paciente_antecedentes_familiaresId>;
  hasPaciente_antecedentes_familiare!: Sequelize.HasManyHasAssociationMixin<paciente_antecedentes_familiares, paciente_antecedentes_familiaresId>;
  hasPaciente_antecedentes_familiares!: Sequelize.HasManyHasAssociationsMixin<paciente_antecedentes_familiares, paciente_antecedentes_familiaresId>;
  countPaciente_antecedentes_familiares!: Sequelize.HasManyCountAssociationsMixin;
  // pacientes hasMany paciente_cirugias via idPaciente
  paciente_cirugia!: paciente_cirugias[];
  getPaciente_cirugia!: Sequelize.HasManyGetAssociationsMixin<paciente_cirugias>;
  setPaciente_cirugia!: Sequelize.HasManySetAssociationsMixin<paciente_cirugias, paciente_cirugiasId>;
  addPaciente_cirugium!: Sequelize.HasManyAddAssociationMixin<paciente_cirugias, paciente_cirugiasId>;
  addPaciente_cirugia!: Sequelize.HasManyAddAssociationsMixin<paciente_cirugias, paciente_cirugiasId>;
  createPaciente_cirugium!: Sequelize.HasManyCreateAssociationMixin<paciente_cirugias>;
  removePaciente_cirugium!: Sequelize.HasManyRemoveAssociationMixin<paciente_cirugias, paciente_cirugiasId>;
  removePaciente_cirugia!: Sequelize.HasManyRemoveAssociationsMixin<paciente_cirugias, paciente_cirugiasId>;
  hasPaciente_cirugium!: Sequelize.HasManyHasAssociationMixin<paciente_cirugias, paciente_cirugiasId>;
  hasPaciente_cirugia!: Sequelize.HasManyHasAssociationsMixin<paciente_cirugias, paciente_cirugiasId>;
  countPaciente_cirugia!: Sequelize.HasManyCountAssociationsMixin;
  // pacientes hasMany paciente_diagnosticos via idPaciente
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
  // pacientes hasMany paciente_evaluacionfisica via idPaciente
  paciente_evaluacionfisicas!: paciente_evaluacionfisica[];
  getPaciente_evaluacionfisicas!: Sequelize.HasManyGetAssociationsMixin<paciente_evaluacionfisica>;
  setPaciente_evaluacionfisicas!: Sequelize.HasManySetAssociationsMixin<paciente_evaluacionfisica, paciente_evaluacionfisicaId>;
  addPaciente_evaluacionfisica!: Sequelize.HasManyAddAssociationMixin<paciente_evaluacionfisica, paciente_evaluacionfisicaId>;
  addPaciente_evaluacionfisicas!: Sequelize.HasManyAddAssociationsMixin<paciente_evaluacionfisica, paciente_evaluacionfisicaId>;
  createPaciente_evaluacionfisica!: Sequelize.HasManyCreateAssociationMixin<paciente_evaluacionfisica>;
  removePaciente_evaluacionfisica!: Sequelize.HasManyRemoveAssociationMixin<paciente_evaluacionfisica, paciente_evaluacionfisicaId>;
  removePaciente_evaluacionfisicas!: Sequelize.HasManyRemoveAssociationsMixin<paciente_evaluacionfisica, paciente_evaluacionfisicaId>;
  hasPaciente_evaluacionfisica!: Sequelize.HasManyHasAssociationMixin<paciente_evaluacionfisica, paciente_evaluacionfisicaId>;
  hasPaciente_evaluacionfisicas!: Sequelize.HasManyHasAssociationsMixin<paciente_evaluacionfisica, paciente_evaluacionfisicaId>;
  countPaciente_evaluacionfisicas!: Sequelize.HasManyCountAssociationsMixin;
  // pacientes hasMany paciente_pruebas_diagnosticas via idPaciente
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
  // pacientes hasMany paciente_recetas via idPaciente
  paciente_receta!: paciente_recetas[];
  getPaciente_receta!: Sequelize.HasManyGetAssociationsMixin<paciente_recetas>;
  setPaciente_receta!: Sequelize.HasManySetAssociationsMixin<paciente_recetas, paciente_recetasId>;
  addPaciente_recetum!: Sequelize.HasManyAddAssociationMixin<paciente_recetas, paciente_recetasId>;
  addPaciente_receta!: Sequelize.HasManyAddAssociationsMixin<paciente_recetas, paciente_recetasId>;
  createPaciente_recetum!: Sequelize.HasManyCreateAssociationMixin<paciente_recetas>;
  removePaciente_recetum!: Sequelize.HasManyRemoveAssociationMixin<paciente_recetas, paciente_recetasId>;
  removePaciente_receta!: Sequelize.HasManyRemoveAssociationsMixin<paciente_recetas, paciente_recetasId>;
  hasPaciente_recetum!: Sequelize.HasManyHasAssociationMixin<paciente_recetas, paciente_recetasId>;
  hasPaciente_receta!: Sequelize.HasManyHasAssociationsMixin<paciente_recetas, paciente_recetasId>;
  countPaciente_receta!: Sequelize.HasManyCountAssociationsMixin;
  // pacientes hasMany paciente_terapia_fisica via idPaciente
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
  // pacientes hasMany paciente_tratamientos via idPaciente
  paciente_tratamientos!: paciente_tratamientos[];
  getPaciente_tratamientos!: Sequelize.HasManyGetAssociationsMixin<paciente_tratamientos>;
  setPaciente_tratamientos!: Sequelize.HasManySetAssociationsMixin<paciente_tratamientos, paciente_tratamientosId>;
  addPaciente_tratamiento!: Sequelize.HasManyAddAssociationMixin<paciente_tratamientos, paciente_tratamientosId>;
  addPaciente_tratamientos!: Sequelize.HasManyAddAssociationsMixin<paciente_tratamientos, paciente_tratamientosId>;
  createPaciente_tratamiento!: Sequelize.HasManyCreateAssociationMixin<paciente_tratamientos>;
  removePaciente_tratamiento!: Sequelize.HasManyRemoveAssociationMixin<paciente_tratamientos, paciente_tratamientosId>;
  removePaciente_tratamientos!: Sequelize.HasManyRemoveAssociationsMixin<paciente_tratamientos, paciente_tratamientosId>;
  hasPaciente_tratamiento!: Sequelize.HasManyHasAssociationMixin<paciente_tratamientos, paciente_tratamientosId>;
  hasPaciente_tratamientos!: Sequelize.HasManyHasAssociationsMixin<paciente_tratamientos, paciente_tratamientosId>;
  countPaciente_tratamientos!: Sequelize.HasManyCountAssociationsMixin;
  // pacientes hasMany turnos via idPaciente
  turnos!: turnos[];
  getTurnos!: Sequelize.HasManyGetAssociationsMixin<turnos>;
  setTurnos!: Sequelize.HasManySetAssociationsMixin<turnos, turnosId>;
  addTurno!: Sequelize.HasManyAddAssociationMixin<turnos, turnosId>;
  addTurnos!: Sequelize.HasManyAddAssociationsMixin<turnos, turnosId>;
  createTurno!: Sequelize.HasManyCreateAssociationMixin<turnos>;
  removeTurno!: Sequelize.HasManyRemoveAssociationMixin<turnos, turnosId>;
  removeTurnos!: Sequelize.HasManyRemoveAssociationsMixin<turnos, turnosId>;
  hasTurno!: Sequelize.HasManyHasAssociationMixin<turnos, turnosId>;
  hasTurnos!: Sequelize.HasManyHasAssociationsMixin<turnos, turnosId>;
  countTurnos!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof pacientes {
    return pacientes.init({
    idPaciente: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "dni"
    },
    fecha_nac: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    peso: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    genero: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    telefono: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    telefonoEmergencia: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    idSeguroMedico: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'paciente_seguromedico',
        key: 'idSeguroMedico'
      }
    },
    tipoSanguineo: {
      type: DataTypes.STRING(5),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pacientes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idPaciente" },
        ]
      },
      {
        name: "dni",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "dni" },
        ]
      },
      {
        name: "idSeguroMedico",
        using: "BTREE",
        fields: [
          { name: "idSeguroMedico" },
        ]
      },
    ]
  });
  }
}
