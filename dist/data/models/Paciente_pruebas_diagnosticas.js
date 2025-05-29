"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paciente_pruebas_diagnosticas = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Paciente_Diagnosticos_1 = require("./Paciente_Diagnosticos");
const Pacientes_1 = require("./Pacientes");
const nombre_Prueba_Diagnostica_1 = require("./nombre_Prueba_Diagnostica");
let Paciente_pruebas_diagnosticas = class Paciente_pruebas_diagnosticas extends sequelize_typescript_1.Model {
};
exports.Paciente_pruebas_diagnosticas = Paciente_pruebas_diagnosticas;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_pruebas_diagnosticas.prototype, "id_Prueba_Diagnostica", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => nombre_Prueba_Diagnostica_1.nombre_Prueba_Diagnostica),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_pruebas_diagnosticas.prototype, "id_nombre_prueba_diagnostica", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => nombre_Prueba_Diagnostica_1.nombre_Prueba_Diagnostica),
    __metadata("design:type", nombre_Prueba_Diagnostica_1.nombre_Prueba_Diagnostica)
], Paciente_pruebas_diagnosticas.prototype, "nombre_prueba_diagnostica", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Length)({ min: 10, max: 255 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Paciente_pruebas_diagnosticas.prototype, "resultado", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Paciente_Diagnosticos_1.Paciente_Diagnosticos),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_pruebas_diagnosticas.prototype, "id_diagnostico", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Paciente_Diagnosticos_1.Paciente_Diagnosticos),
    __metadata("design:type", Paciente_Diagnosticos_1.Paciente_Diagnosticos)
], Paciente_pruebas_diagnosticas.prototype, "diagnostico", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Pacientes_1.Pacientes),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_pruebas_diagnosticas.prototype, "id_paciente", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Pacientes_1.Pacientes),
    __metadata("design:type", Pacientes_1.Pacientes)
], Paciente_pruebas_diagnosticas.prototype, "paciente", void 0);
exports.Paciente_pruebas_diagnosticas = Paciente_pruebas_diagnosticas = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "paciente_pruebas_diagnosticas"
    })
], Paciente_pruebas_diagnosticas);
//# sourceMappingURL=Paciente_pruebas_diagnosticas.js.map