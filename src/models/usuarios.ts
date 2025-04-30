import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { enfermeros, enfermerosCreationAttributes, enfermerosId } from './enfermeros';
import type { medicos, medicosCreationAttributes, medicosId } from './medicos';
import type { personal_de_admision, personal_de_admisionCreationAttributes, personal_de_admisionId } from './personal_de_admision';
import type { roles, rolesId } from './roles';

export interface usuariosAttributes {
  idUsuario: number;
  email: string;
  password_hash: string;
  activo?: number;
  intentos_fallidos?: number;
  idRol?: number;
}

export type usuariosPk = "idUsuario";
export type usuariosId = usuarios[usuariosPk];
export type usuariosOptionalAttributes = "idUsuario" | "activo" | "intentos_fallidos" | "idRol";
export type usuariosCreationAttributes = Optional<usuariosAttributes, usuariosOptionalAttributes>;

export class usuarios extends Model<usuariosAttributes, usuariosCreationAttributes> implements usuariosAttributes {
  idUsuario!: number;
  email!: string;
  password_hash!: string;
  activo?: number;
  intentos_fallidos?: number;
  idRol?: number;

  // usuarios belongsTo roles via idRol
  idRol_role!: roles;
  getIdRol_role!: Sequelize.BelongsToGetAssociationMixin<roles>;
  setIdRol_role!: Sequelize.BelongsToSetAssociationMixin<roles, rolesId>;
  createIdRol_role!: Sequelize.BelongsToCreateAssociationMixin<roles>;
  // usuarios hasOne enfermeros via idUsuario
  enfermero!: enfermeros;
  getEnfermero!: Sequelize.HasOneGetAssociationMixin<enfermeros>;
  setEnfermero!: Sequelize.HasOneSetAssociationMixin<enfermeros, enfermerosId>;
  createEnfermero!: Sequelize.HasOneCreateAssociationMixin<enfermeros>;
  // usuarios hasOne medicos via idUsuario
  medico!: medicos;
  getMedico!: Sequelize.HasOneGetAssociationMixin<medicos>;
  setMedico!: Sequelize.HasOneSetAssociationMixin<medicos, medicosId>;
  createMedico!: Sequelize.HasOneCreateAssociationMixin<medicos>;
  // usuarios hasOne personal_de_admision via idUsuario
  personal_de_admision!: personal_de_admision;
  getPersonal_de_admision!: Sequelize.HasOneGetAssociationMixin<personal_de_admision>;
  setPersonal_de_admision!: Sequelize.HasOneSetAssociationMixin<personal_de_admision, personal_de_admisionId>;
  createPersonal_de_admision!: Sequelize.HasOneCreateAssociationMixin<personal_de_admision>;

  static initModel(sequelize: Sequelize.Sequelize): typeof usuarios {
    return usuarios.init({
    idUsuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "email"
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    intentos_fallidos: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    idRol: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'roles',
        key: 'idRol'
      }
    }
  }, {
    sequelize,
    tableName: 'usuarios',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUsuario" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "idRol",
        using: "BTREE",
        fields: [
          { name: "idRol" },
        ]
      },
    ]
  });
  }
}
