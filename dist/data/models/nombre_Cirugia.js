"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nombre_Cirugia = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Paciente_Cirugias_1 = require("./Paciente_Cirugias");
let nombre_Cirugia = class nombre_Cirugia extends sequelize_typescript_1.Model {
};
exports.nombre_Cirugia = nombre_Cirugia;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], nombre_Cirugia.prototype, "id_nombre_cirugia", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], nombre_Cirugia.prototype, "nombre", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Paciente_Cirugias_1.Paciente_Cirugias)
], nombre_Cirugia.prototype, "paciente_cirugias", void 0);
exports.nombre_Cirugia = nombre_Cirugia = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "nombre_cirugia" })
], nombre_Cirugia);
