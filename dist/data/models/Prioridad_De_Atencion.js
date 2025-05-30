"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prioridad_De_Atencion = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Admision_1 = require("./Admision");
let Prioridad_De_Atencion = class Prioridad_De_Atencion extends sequelize_typescript_1.Model {
};
exports.Prioridad_De_Atencion = Prioridad_De_Atencion;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Prioridad_De_Atencion.prototype, "id_prioridad_de_atencion", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Prioridad_De_Atencion.prototype, "prioridad", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Admision_1.Admision)
], Prioridad_De_Atencion.prototype, "admision", void 0);
exports.Prioridad_De_Atencion = Prioridad_De_Atencion = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "prioridad_de_atencion" })
], Prioridad_De_Atencion);
