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
exports.Paciente_Evaluacion_Fisica = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Pacientes_1 = require("./Pacientes");
const Enfermero_1 = require("./Enfermero");
let Paciente_Evaluacion_Fisica = class Paciente_Evaluacion_Fisica extends sequelize_typescript_1.Model {
};
exports.Paciente_Evaluacion_Fisica = Paciente_Evaluacion_Fisica;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_Evaluacion_Fisica.prototype, "id_Evaluacion_fisica", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], Paciente_Evaluacion_Fisica.prototype, "fecha", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_Evaluacion_Fisica.prototype, "presion_arterial", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_Evaluacion_Fisica.prototype, "frecuencia_cardiaca", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Paciente_Evaluacion_Fisica.prototype, "color_de_piel", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Paciente_Evaluacion_Fisica.prototype, "respuesta_a_estimulos", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Pacientes_1.Pacientes),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_Evaluacion_Fisica.prototype, "paciente_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Pacientes_1.Pacientes),
    __metadata("design:type", Pacientes_1.Pacientes)
], Paciente_Evaluacion_Fisica.prototype, "paciente", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Enfermero_1.Enfermero),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_Evaluacion_Fisica.prototype, "enfermero_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Enfermero_1.Enfermero),
    __metadata("design:type", Enfermero_1.Enfermero)
], Paciente_Evaluacion_Fisica.prototype, "enfermero", void 0);
exports.Paciente_Evaluacion_Fisica = Paciente_Evaluacion_Fisica = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "paciente_evaluacion_fisica"
    })
], Paciente_Evaluacion_Fisica);
//# sourceMappingURL=Paciente_Evaluacion_Fisica.js.map