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
exports.Paciente_recetas = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Pacientes_1 = require("./Pacientes");
const Medicos_1 = require("./Medicos");
const Medicamentos_1 = require("./Medicamentos");
let Paciente_recetas = class Paciente_recetas extends sequelize_typescript_1.Model {
};
exports.Paciente_recetas = Paciente_recetas;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_recetas.prototype, "id_Receta", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], Paciente_recetas.prototype, "fecha", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Pacientes_1.Pacientes),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_recetas.prototype, "id_paciente", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Pacientes_1.Pacientes),
    __metadata("design:type", Pacientes_1.Pacientes)
], Paciente_recetas.prototype, "paciente", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Medicos_1.Medicos),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_recetas.prototype, "id_medico", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Medicos_1.Medicos),
    __metadata("design:type", Medicos_1.Medicos)
], Paciente_recetas.prototype, "medico", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Medicamentos_1.Medicamentos),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_recetas.prototype, "id_medicamento", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Medicamentos_1.Medicamentos),
    __metadata("design:type", Medicamentos_1.Medicamentos)
], Paciente_recetas.prototype, "medicamento", void 0);
exports.Paciente_recetas = Paciente_recetas = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "paciente_recetas"
    })
], Paciente_recetas);
//# sourceMappingURL=Paciente_recetas.js.map