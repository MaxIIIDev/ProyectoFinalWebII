"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medicamentos = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Paciente_recetas_1 = require("./Paciente_recetas");
const paciente_tratamientos_1 = require("./paciente_tratamientos");
const Tipo_De_Medicamento_1 = require("./Tipo_De_Medicamento");
let Medicamentos = class Medicamentos extends sequelize_typescript_1.Model {
};
exports.Medicamentos = Medicamentos;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Medicamentos.prototype, "id_Medicamento", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Length)({ min: 3, max: 100 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Medicamentos.prototype, "nombre", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Tipo_De_Medicamento_1.Tipo_De_Medicamento),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Medicamentos.prototype, "id_tipo_de_medicamento", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Tipo_De_Medicamento_1.Tipo_De_Medicamento)
], Medicamentos.prototype, "tipo_de_medicamento", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DOUBLE)
], Medicamentos.prototype, "dosis_Recomendada", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DOUBLE)
], Medicamentos.prototype, "cantidad_Contenida", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Medicamentos.prototype, "codigo", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Paciente_recetas_1.Paciente_recetas)
], Medicamentos.prototype, "receta", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => paciente_tratamientos_1.paciente_tratamientos)
], Medicamentos.prototype, "tratamientos", void 0);
exports.Medicamentos = Medicamentos = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "medicamentos" })
], Medicamentos);
