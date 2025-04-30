import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { paciente_evaluacionfisica, paciente_evaluacionfisicaId } from './paciente_evaluacionfisica';
import type { paciente_tratamientos, paciente_tratamientosId } from './paciente_tratamientos';
import type { usuarios, usuariosId } from './usuarios';

export interface enfermerosAttributes {
  idEnfermero: number;
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
  especialidad?: string;
  idUsuario: number;
}

export type enfermerosPk = "idEnfermero";
export type enfermerosId = enfermeros[enfermerosPk];
export type enfermerosOptionalAttributes = "idEnfermero" | "peso" | "telefonoEmergencia" | "direccion" | "especialidad";
export type enfermerosCreationAttributes = Optional<enfermerosAttributes, enfermerosOptionalAttributes>;

export class enfermeros extends Model<enfermerosAttributes, enfermerosCreationAttributes> implements enfermerosAttributes {
  idEnfermero!: number;
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
  especialidad?: string;
  idUsuario!: number;

  // enfermeros hasMany paciente_evaluacionfisica via idEnfermero
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
  // enfermeros hasMany paciente_tratamientos via idEnfermero
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
  // enfermeros belongsTo usuarios via idUsuario
  idUsuario_usuario!: usuarios;
  getIdUsuario_usuario!: Sequelize.BelongsToGetAssociationMixin<usuarios>;
  setIdUsuario_usuario!: Sequelize.BelongsToSetAssociationMixin<usuarios, usuariosId>;
  createIdUsuario_usuario!: Sequelize.BelongsToCreateAssociationMixin<usuarios>;

  static initModel(sequelize: Sequelize.Sequelize): typeof enfermeros {
    return enfermeros.init({
    idEnfermero: {
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
      allowNull: true
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'idUsuario'
      },
      unique: "enfermeros_ibfk_1"
    }
  }, {
    sequelize,
    tableName: 'enfermeros',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idEnfermero" },
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
