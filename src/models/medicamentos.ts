import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { paciente_recetas, paciente_recetasId } from './paciente_recetas';
import type { paciente_tratamientos, paciente_tratamientosId } from './paciente_tratamientos';

export interface medicamentosAttributes {
  idMedicamento: number;
  nombre: string;
  tipo: string;
  dosisRecomendada: number;
  cantidadContenidaMl: number;
  codigo: number;
}

export type medicamentosPk = "idMedicamento";
export type medicamentosId = medicamentos[medicamentosPk];
export type medicamentosOptionalAttributes = "idMedicamento";
export type medicamentosCreationAttributes = Optional<medicamentosAttributes, medicamentosOptionalAttributes>;

export class medicamentos extends Model<medicamentosAttributes, medicamentosCreationAttributes> implements medicamentosAttributes {
  idMedicamento!: number;
  nombre!: string;
  tipo!: string;
  dosisRecomendada!: number;
  cantidadContenidaMl!: number;
  codigo!: number;

  // medicamentos hasMany paciente_recetas via idMedicamento
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
  // medicamentos hasMany paciente_tratamientos via idMedicamento
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

  static initModel(sequelize: Sequelize.Sequelize): typeof medicamentos {
    return medicamentos.init({
    idMedicamento: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    dosisRecomendada: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    cantidadContenidaMl: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    codigo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "codigo"
    }
  }, {
    sequelize,
    tableName: 'medicamentos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idMedicamento" },
        ]
      },
      {
        name: "codigo",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "codigo" },
        ]
      },
    ]
  });
  }
}
