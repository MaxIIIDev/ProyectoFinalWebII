import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { usuarios, usuariosId } from './usuarios';

export interface personal_de_admisionAttributes {
  idPersonalDeAdmision: number;
  nombre: string;
  apellido: string;
  dni: number;
  fecha_nac: string;
  edad: number;
  peso?: number;
  genero: string;
  telefono: number;
  telefonoEmergencia?: number;
  direccion: string;
  tipoSanguineo: string;
  idUsuario: number;
}

export type personal_de_admisionPk = "idPersonalDeAdmision";
export type personal_de_admisionId = personal_de_admision[personal_de_admisionPk];
export type personal_de_admisionOptionalAttributes = "idPersonalDeAdmision" | "peso" | "telefonoEmergencia";
export type personal_de_admisionCreationAttributes = Optional<personal_de_admisionAttributes, personal_de_admisionOptionalAttributes>;

export class personal_de_admision extends Model<personal_de_admisionAttributes, personal_de_admisionCreationAttributes> implements personal_de_admisionAttributes {
  idPersonalDeAdmision!: number;
  nombre!: string;
  apellido!: string;
  dni!: number;
  fecha_nac!: string;
  edad!: number;
  peso?: number;
  genero!: string;
  telefono!: number;
  telefonoEmergencia?: number;
  direccion!: string;
  tipoSanguineo!: string;
  idUsuario!: number;

  // personal_de_admision belongsTo usuarios via idUsuario
  idUsuario_usuario!: usuarios;
  getIdUsuario_usuario!: Sequelize.BelongsToGetAssociationMixin<usuarios>;
  setIdUsuario_usuario!: Sequelize.BelongsToSetAssociationMixin<usuarios, usuariosId>;
  createIdUsuario_usuario!: Sequelize.BelongsToCreateAssociationMixin<usuarios>;

  static initModel(sequelize: Sequelize.Sequelize): typeof personal_de_admision {
    return personal_de_admision.init({
    idPersonalDeAdmision: {
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
      allowNull: false
    },
    tipoSanguineo: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'idUsuario'
      },
      unique: "personal_de_admision_ibfk_1"
    }
  }, {
    sequelize,
    tableName: 'personal_de_admision',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idPersonalDeAdmision" },
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
