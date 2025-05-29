"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pacientes = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Tipo_Sanguineo_1 = require("./Tipo_Sanguineo");
const Admision_1 = require("./Admision");
const Paciente_Alergias_1 = require("./Paciente_Alergias");
const Paciente_antecedentes_familiares_1 = require("./Paciente_antecedentes_familiares");
const Paciente_Diagnosticos_1 = require("./Paciente_Diagnosticos");
const Paciente_Evaluacion_Fisica_1 = require("./Paciente_Evaluacion_Fisica");
const Paciente_pruebas_diagnosticas_1 = require("./Paciente_pruebas_diagnosticas");
const Paciente_recetas_1 = require("./Paciente_recetas");
const Paciente_seguro_medico_1 = require("./Paciente_seguro_medico");
const paciente_tratamientos_1 = require("./paciente_tratamientos");
const Turnos_1 = require("./Turnos");
const Paciente_Cirugias_1 = require("./Paciente_Cirugias");
let Pacientes = class Pacientes extends sequelize_typescript_1.Model {
};
exports.Pacientes = Pacientes;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Pacientes.prototype, "id_Paciente", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Length)({ min: 3, max: 255 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Pacientes.prototype, "nombre", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Length)({ min: 3, max: 255 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Pacientes.prototype, "apellido", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Pacientes.prototype, "dni", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE)
], Pacientes.prototype, "fecha_nac", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Pacientes.prototype, "edad", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DOUBLE)
], Pacientes.prototype, "peso", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Length)({ min: 6, max: 20 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Pacientes.prototype, "genero", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT)
], Pacientes.prototype, "telefono", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BIGINT)
], Pacientes.prototype, "telefono_De_Emergencia", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Pacientes.prototype, "direccion", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Tipo_Sanguineo_1.Tipo_Sanguineo),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Pacientes.prototype, "id_tipo_sanguineo", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Tipo_Sanguineo_1.Tipo_Sanguineo)
], Pacientes.prototype, "tipo_sanguineo", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Admision_1.Admision)
], Pacientes.prototype, "admisiones", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Paciente_seguro_medico_1.Paciente_seguro_medico),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Pacientes.prototype, "id_seguro_medico", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Paciente_seguro_medico_1.Paciente_seguro_medico)
], Pacientes.prototype, "seguro_medico", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Paciente_Alergias_1.Paciente_Alergias)
], Pacientes.prototype, "alergias", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Paciente_antecedentes_familiares_1.Paciente_antecedentes_familiares)
], Pacientes.prototype, "antecedentes", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Paciente_Cirugias_1.Paciente_Cirugias)
], Pacientes.prototype, "cirugias", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Paciente_Diagnosticos_1.Paciente_Diagnosticos)
], Pacientes.prototype, "diagnostico", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Paciente_Evaluacion_Fisica_1.Paciente_Evaluacion_Fisica)
], Pacientes.prototype, "evaluaciones_fisicas", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Paciente_pruebas_diagnosticas_1.Paciente_pruebas_diagnosticas)
], Pacientes.prototype, "pruebasDiagnosticasDelPaciente", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Paciente_recetas_1.Paciente_recetas)
], Pacientes.prototype, "recetas", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => paciente_tratamientos_1.paciente_tratamientos)
], Pacientes.prototype, "tratamientos", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Turnos_1.Turnos)
], Pacientes.prototype, "turnos", void 0);
exports.Pacientes = Pacientes = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "pacientes" })
], Pacientes);
