"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.horarios_Turnos = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Turnos_1 = require("./Turnos");
let horarios_Turnos = class horarios_Turnos extends sequelize_typescript_1.Model {
};
exports.horarios_Turnos = horarios_Turnos;
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], horarios_Turnos.prototype, "id_horario_turno", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], horarios_Turnos.prototype, "hora", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Turnos_1.Turnos)
], horarios_Turnos.prototype, "turnos", void 0);
exports.horarios_Turnos = horarios_Turnos = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "horarios_turnos" })
], horarios_Turnos);
