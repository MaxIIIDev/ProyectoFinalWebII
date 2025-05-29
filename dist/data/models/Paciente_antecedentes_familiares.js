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
exports.Paciente_antecedentes_familiares = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Pacientes_1 = require("./Pacientes");
const Lazo_familiar_1 = require("./Lazo_familiar");
let Paciente_antecedentes_familiares = class Paciente_antecedentes_familiares extends sequelize_typescript_1.Model {
};
exports.Paciente_antecedentes_familiares = Paciente_antecedentes_familiares;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_antecedentes_familiares.prototype, "id_Antecedente_Familiar", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Length)({ min: 10, max: 255 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Paciente_antecedentes_familiares.prototype, "nombre_Enfermedad", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Length)({ min: 10, max: 255 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Paciente_antecedentes_familiares.prototype, "detalles", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Lazo_familiar_1.Lazo_Familiar),
    __metadata("design:type", Array)
], Paciente_antecedentes_familiares.prototype, "lazo_familiar", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Pacientes_1.Pacientes),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_antecedentes_familiares.prototype, "id_Paciente", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Pacientes_1.Pacientes),
    __metadata("design:type", Pacientes_1.Pacientes)
], Paciente_antecedentes_familiares.prototype, "paciente", void 0);
exports.Paciente_antecedentes_familiares = Paciente_antecedentes_familiares = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "paciente_antecedentes_familiares" })
], Paciente_antecedentes_familiares);
//# sourceMappingURL=Paciente_antecedentes_familiares.js.map