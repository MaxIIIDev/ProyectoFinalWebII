import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { hospital_alas, hospital_alasId } from './hospital_alas';
import type { hospital_camas, hospital_camasId } from './hospital_camas';

export interface hospital_habitacionesAttributes {
  idHabitacion: number;
  nroHabitacion: number;
  idAla?: number;
}

export type hospital_habitacionesPk = "idHabitacion";
export type hospital_habitacionesId = hospital_habitaciones[hospital_habitacionesPk];
export type hospital_habitacionesOptionalAttributes = "idHabitacion" | "idAla";
export type hospital_habitacionesCreationAttributes = Optional<hospital_habitacionesAttributes, hospital_habitacionesOptionalAttributes>;

export class hospital_habitaciones extends Model<hospital_habitacionesAttributes, hospital_habitacionesCreationAttributes> implements hospital_habitacionesAttributes {
  idHabitacion!: number;
  nroHabitacion!: number;
  idAla?: number;

  // hospital_habitaciones belongsTo hospital_alas via idAla
  idAla_hospital_ala!: hospital_alas;
  getIdAla_hospital_ala!: Sequelize.BelongsToGetAssociationMixin<hospital_alas>;
  setIdAla_hospital_ala!: Sequelize.BelongsToSetAssociationMixin<hospital_alas, hospital_alasId>;
  createIdAla_hospital_ala!: Sequelize.BelongsToCreateAssociationMixin<hospital_alas>;
  // hospital_habitaciones hasMany hospital_camas via idHabitacion
  hospital_camas!: hospital_camas[];
  getHospital_camas!: Sequelize.HasManyGetAssociationsMixin<hospital_camas>;
  setHospital_camas!: Sequelize.HasManySetAssociationsMixin<hospital_camas, hospital_camasId>;
  addHospital_cama!: Sequelize.HasManyAddAssociationMixin<hospital_camas, hospital_camasId>;
  addHospital_camas!: Sequelize.HasManyAddAssociationsMixin<hospital_camas, hospital_camasId>;
  createHospital_cama!: Sequelize.HasManyCreateAssociationMixin<hospital_camas>;
  removeHospital_cama!: Sequelize.HasManyRemoveAssociationMixin<hospital_camas, hospital_camasId>;
  removeHospital_camas!: Sequelize.HasManyRemoveAssociationsMixin<hospital_camas, hospital_camasId>;
  hasHospital_cama!: Sequelize.HasManyHasAssociationMixin<hospital_camas, hospital_camasId>;
  hasHospital_camas!: Sequelize.HasManyHasAssociationsMixin<hospital_camas, hospital_camasId>;
  countHospital_camas!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof hospital_habitaciones {
    return hospital_habitaciones.init({
    idHabitacion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nroHabitacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "nroHabitacion"
    },
    idAla: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'hospital_alas',
        key: 'idAla'
      }
    }
  }, {
    sequelize,
    tableName: 'hospital_habitaciones',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idHabitacion" },
        ]
      },
      {
        name: "nroHabitacion",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nroHabitacion" },
        ]
      },
      {
        name: "idAla",
        using: "BTREE",
        fields: [
          { name: "idAla" },
        ]
      },
    ]
  });
  }
}
