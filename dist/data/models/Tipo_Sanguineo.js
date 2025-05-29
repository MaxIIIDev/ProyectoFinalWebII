"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tipo_Sanguineo = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Pacientes_1 = require("./Pacientes");
let Tipo_Sanguineo = class Tipo_Sanguineo extends sequelize_typescript_1.Model {
};
exports.Tipo_Sanguineo = Tipo_Sanguineo;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Tipo_Sanguineo.prototype, "id_tipo_sanguineo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Tipo_Sanguineo.prototype, "nombre", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Pacientes_1.Pacientes)
], Tipo_Sanguineo.prototype, "pacientes", void 0);
exports.Tipo_Sanguineo = Tipo_Sanguineo = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "tipo_sanguineo" })
], Tipo_Sanguineo);
