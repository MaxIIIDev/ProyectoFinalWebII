"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nombre_Alergia = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Paciente_Alergias_1 = require("./Paciente_Alergias");
let nombre_Alergia = class nombre_Alergia extends sequelize_typescript_1.Model {
};
exports.nombre_Alergia = nombre_Alergia;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], nombre_Alergia.prototype, "id_nombre_alergia", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], nombre_Alergia.prototype, "nombre", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Paciente_Alergias_1.Paciente_Alergias)
], nombre_Alergia.prototype, "paciente_alergias", void 0);
exports.nombre_Alergia = nombre_Alergia = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "nombre_alergia" })
], nombre_Alergia);
