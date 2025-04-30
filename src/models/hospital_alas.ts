import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { hospital_habitaciones, hospital_habitacionesId } from './hospital_habitaciones';

export interface hospital_alasAttributes {
  idAla: number;
  nombre: string;
  piso: number;
  cantidadHabitaciones: number;
  cantidadCamas: number;
  unidad: string;
}

export type hospital_alasPk = "idAla";
export type hospital_alasId = hospital_alas[hospital_alasPk];
export type hospital_alasOptionalAttributes = "idAla";
export type hospital_alasCreationAttributes = Optional<hospital_alasAttributes, hospital_alasOptionalAttributes>;

export class hospital_alas extends Model<hospital_alasAttributes, hospital_alasCreationAttributes> implements hospital_alasAttributes {
  idAla!: number;
  nombre!: string;
  piso!: number;
  cantidadHabitaciones!: number;
  cantidadCamas!: number;
  unidad!: string;

  // hospital_alas hasMany hospital_habitaciones via idAla
  hospital_habitaciones!: hospital_habitaciones[];
  getHospital_habitaciones!: Sequelize.HasManyGetAssociationsMixin<hospital_habitaciones>;
  setHospital_habitaciones!: Sequelize.HasManySetAssociationsMixin<hospital_habitaciones, hospital_habitacionesId>;
  addHospital_habitacione!: Sequelize.HasManyAddAssociationMixin<hospital_habitaciones, hospital_habitacionesId>;
  addHospital_habitaciones!: Sequelize.HasManyAddAssociationsMixin<hospital_habitaciones, hospital_habitacionesId>;
  createHospital_habitacione!: Sequelize.HasManyCreateAssociationMixin<hospital_habitaciones>;
  removeHospital_habitacione!: Sequelize.HasManyRemoveAssociationMixin<hospital_habitaciones, hospital_habitacionesId>;
  removeHospital_habitaciones!: Sequelize.HasManyRemoveAssociationsMixin<hospital_habitaciones, hospital_habitacionesId>;
  hasHospital_habitacione!: Sequelize.HasManyHasAssociationMixin<hospital_habitaciones, hospital_habitacionesId>;
  hasHospital_habitaciones!: Sequelize.HasManyHasAssociationsMixin<hospital_habitaciones, hospital_habitacionesId>;
  countHospital_habitaciones!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof hospital_alas {
    return hospital_alas.init({
    idAla: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    piso: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidadHabitaciones: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidadCamas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unidad: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'hospital_alas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idAla" },
        ]
      },
    ]
  });
  }
}
