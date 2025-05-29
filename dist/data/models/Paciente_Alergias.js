"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paciente_Alergias = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Pacientes_1 = require("./Pacientes");
const paciente_tratamientos_1 = require("./paciente_tratamientos");
const nombre_Alergia_1 = require("./nombre_Alergia");
let Paciente_Alergias = class Paciente_Alergias extends sequelize_typescript_1.Model {
};
exports.Paciente_Alergias = Paciente_Alergias;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Paciente_Alergias.prototype, "id_Alergia", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => nombre_Alergia_1.nombre_Alergia),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Paciente_Alergias.prototype, "id_nombre_alergia", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => nombre_Alergia_1.nombre_Alergia)
], Paciente_Alergias.prototype, "nombre_alergia", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Paciente_Alergias.prototype, "descripcion", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Pacientes_1.Pacientes),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Paciente_Alergias.prototype, "id_paciente", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Pacientes_1.Pacientes)
], Paciente_Alergias.prototype, "paciente", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => paciente_tratamientos_1.paciente_tratamientos),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Paciente_Alergias.prototype, "id_tratamiento", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => paciente_tratamientos_1.paciente_tratamientos)
], Paciente_Alergias.prototype, "tratamiento", void 0);
exports.Paciente_Alergias = Paciente_Alergias = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "paciente_alergias" })
], Paciente_Alergias);
