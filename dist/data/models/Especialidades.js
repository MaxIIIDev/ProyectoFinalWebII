"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Especialidades = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Medicos_1 = require("./Medicos");
let Especialidades = class Especialidades extends sequelize_typescript_1.Model {
};
exports.Especialidades = Especialidades;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Especialidades.prototype, "id_Especialidad", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Especialidades.prototype, "nombre", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Medicos_1.Medicos)
], Especialidades.prototype, "medicos", void 0);
exports.Especialidades = Especialidades = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "especialidades" })
], Especialidades);
