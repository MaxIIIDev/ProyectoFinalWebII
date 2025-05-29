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
exports.Paciente_Diagnosticos = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Medicos_1 = require("./Medicos");
const Pacientes_1 = require("./Pacientes");
const paciente_tratamientos_1 = require("./paciente_tratamientos");
const Paciente_pruebas_diagnosticas_1 = require("./Paciente_pruebas_diagnosticas");
const Sintomas_1 = require("./Sintomas");
const Tipo_De_Diagnostico_1 = require("./Tipo_De_Diagnostico");
let Paciente_Diagnosticos = class Paciente_Diagnosticos extends sequelize_typescript_1.Model {
};
exports.Paciente_Diagnosticos = Paciente_Diagnosticos;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_Diagnosticos.prototype, "id_Paciente_Diagnosticos", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], Paciente_Diagnosticos.prototype, "fecha", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Tipo_De_Diagnostico_1.Tipo_De_Diagnostico),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_Diagnosticos.prototype, "id_tipo_de_diagnostico", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Tipo_De_Diagnostico_1.Tipo_De_Diagnostico),
    __metadata("design:type", Tipo_De_Diagnostico_1.Tipo_De_Diagnostico)
], Paciente_Diagnosticos.prototype, "tipo_de_diagnostico", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Sintomas_1.Sintomas),
    __metadata("design:type", Array)
], Paciente_Diagnosticos.prototype, "sintomas", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Length)({ min: 3, max: 255 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Paciente_Diagnosticos.prototype, "detalles", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Medicos_1.Medicos),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_Diagnosticos.prototype, "id_medico", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Medicos_1.Medicos),
    __metadata("design:type", Medicos_1.Medicos)
], Paciente_Diagnosticos.prototype, "medico", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Pacientes_1.Pacientes),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_Diagnosticos.prototype, "id_paciente", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Pacientes_1.Pacientes),
    __metadata("design:type", Pacientes_1.Pacientes)
], Paciente_Diagnosticos.prototype, "paciente", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => paciente_tratamientos_1.paciente_tratamientos),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_Diagnosticos.prototype, "id_tratamiento", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => paciente_tratamientos_1.paciente_tratamientos),
    __metadata("design:type", paciente_tratamientos_1.paciente_tratamientos)
], Paciente_Diagnosticos.prototype, "tratamiento", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Paciente_pruebas_diagnosticas_1.Paciente_pruebas_diagnosticas),
    __metadata("design:type", Paciente_pruebas_diagnosticas_1.Paciente_pruebas_diagnosticas)
], Paciente_Diagnosticos.prototype, "pruebas_diagnosticas", void 0);
exports.Paciente_Diagnosticos = Paciente_Diagnosticos = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "paciente_diagnosticos" })
], Paciente_Diagnosticos);
//# sourceMappingURL=Paciente_Diagnosticos.js.map