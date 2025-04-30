import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { paciente_cirugias, paciente_cirugiasId } from './paciente_cirugias';
import type { paciente_diagnosticos, paciente_diagnosticosId } from './paciente_diagnosticos';
import type { paciente_recetas, paciente_recetasId } from './paciente_recetas';
import type { turnos, turnosId } from './turnos';
import type { usuarios, usuariosId } from './usuarios';

export interface medicosAttributes {
  idMedico: number;
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
  especialidad: string;
  idUsuario: number;
}

export type medicosPk = "idMedico";
export type medicosId = medicos[medicosPk];
export type medicosOptionalAttributes = "idMedico" | "peso" | "telefonoEmergencia" | "direccion";
export type medicosCreationAttributes = Optional<medicosAttributes, medicosOptionalAttributes>;

export class medicos extends Model<medicosAttributes, medicosCreationAttributes> implements medicosAttributes {
  idMedico!: number;
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
  especialidad!: string;
  idUsuario!: number;

  // medicos hasMany paciente_cirugias via idMedico
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
  // medicos hasMany paciente_diagnosticos via idMedico
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
  // medicos hasMany paciente_recetas via idMedico
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
  // medicos hasMany turnos via idMedico
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
  // medicos belongsTo usuarios via idUsuario
  idUsuario_usuario!: usuarios;
  getIdUsuario_usuario!: Sequelize.BelongsToGetAssociationMixin<usuarios>;
  setIdUsuario_usuario!: Sequelize.BelongsToSetAssociationMixin<usuarios, usuariosId>;
  createIdUsuario_usuario!: Sequelize.BelongsToCreateAssociationMixin<usuarios>;

  static initModel(sequelize: Sequelize.Sequelize): typeof medicos {
    return medicos.init({
    idMedico: {
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
    especialidad: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'idUsuario'
      },
      unique: "medicos_ibfk_1"
    }
  }, {
    sequelize,
    tableName: 'medicos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idMedico" },
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
        name: "idUsuario",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUsuario" },
        ]
      },
    ]
  });
  }
}
