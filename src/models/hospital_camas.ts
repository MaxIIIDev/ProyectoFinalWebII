import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { admision, admisionId } from './admision';
import type { hospital_habitaciones, hospital_habitacionesId } from './hospital_habitaciones';

export interface hospital_camasAttributes {
  idCama: number;
  disponible?: number;
  idHabitacion?: number;
}

export type hospital_camasPk = "idCama";
export type hospital_camasId = hospital_camas[hospital_camasPk];
export type hospital_camasOptionalAttributes = "idCama" | "disponible" | "idHabitacion";
export type hospital_camasCreationAttributes = Optional<hospital_camasAttributes, hospital_camasOptionalAttributes>;

export class hospital_camas extends Model<hospital_camasAttributes, hospital_camasCreationAttributes> implements hospital_camasAttributes {
  idCama!: number;
  disponible?: number;
  idHabitacion?: number;

  // hospital_camas hasMany admision via idCama
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
  // hospital_camas belongsTo hospital_habitaciones via idHabitacion
  idHabitacion_hospital_habitacione!: hospital_habitaciones;
  getIdHabitacion_hospital_habitacione!: Sequelize.BelongsToGetAssociationMixin<hospital_habitaciones>;
  setIdHabitacion_hospital_habitacione!: Sequelize.BelongsToSetAssociationMixin<hospital_habitaciones, hospital_habitacionesId>;
  createIdHabitacion_hospital_habitacione!: Sequelize.BelongsToCreateAssociationMixin<hospital_habitaciones>;

  static initModel(sequelize: Sequelize.Sequelize): typeof hospital_camas {
    return hospital_camas.init({
    idCama: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    idHabitacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'hospital_habitaciones',
        key: 'idHabitacion'
      }
    }
  }, {
    sequelize,
    tableName: 'hospital_camas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCama" },
        ]
      },
      {
        name: "idHabitacion",
        using: "BTREE",
        fields: [
          { name: "idHabitacion" },
        ]
      },
    ]
  });
  }
}
