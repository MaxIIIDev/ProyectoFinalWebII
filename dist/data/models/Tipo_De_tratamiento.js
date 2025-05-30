"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tipo_De_tratamiento = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const paciente_tratamientos_1 = require("./paciente_tratamientos");
let Tipo_De_tratamiento = class Tipo_De_tratamiento extends sequelize_typescript_1.Model {
};
exports.Tipo_De_tratamiento = Tipo_De_tratamiento;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Tipo_De_tratamiento.prototype, "id_Tipo_De_Tratamiento", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Tipo_De_tratamiento.prototype, "nombre", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => paciente_tratamientos_1.paciente_tratamientos)
], Tipo_De_tratamiento.prototype, "paciente_tratamientos", void 0);
exports.Tipo_De_tratamiento = Tipo_De_tratamiento = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "tipo_de_tratamiento" })
], Tipo_De_tratamiento);
