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
exports.Turnos = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Pacientes_1 = require("./Pacientes");
const Medicos_1 = require("./Medicos");
const horarios_Turnos_1 = require("./horarios_Turnos");
let Turnos = class Turnos extends sequelize_typescript_1.Model {
};
exports.Turnos = Turnos;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Turnos.prototype, "id_turno", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], Turnos.prototype, "fecha", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => horarios_Turnos_1.horarios_Turnos),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Turnos.prototype, "id_horario_turno", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => horarios_Turnos_1.horarios_Turnos),
    __metadata("design:type", horarios_Turnos_1.horarios_Turnos)
], Turnos.prototype, "horario_turno", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Length)({ min: 30, max: 255 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Turnos.prototype, "motivo", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Pacientes_1.Pacientes),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Turnos.prototype, "id_paciente", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Pacientes_1.Pacientes),
    __metadata("design:type", Pacientes_1.Pacientes)
], Turnos.prototype, "paciente", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Medicos_1.Medicos),
    __metadata("design:type", Number)
], Turnos.prototype, "id_medico", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Medicos_1.Medicos),
    __metadata("design:type", Medicos_1.Medicos)
], Turnos.prototype, "medico", void 0);
exports.Turnos = Turnos = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "turnos" })
], Turnos);
//# sourceMappingURL=Turnos.js.map