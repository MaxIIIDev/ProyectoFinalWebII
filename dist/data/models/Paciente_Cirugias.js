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
exports.Paciente_Cirugias = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Pacientes_1 = require("./Pacientes");
const Medicos_1 = require("./Medicos");
const nombre_Cirugia_1 = require("./nombre_Cirugia");
let Paciente_Cirugias = class Paciente_Cirugias extends sequelize_typescript_1.Model {
};
exports.Paciente_Cirugias = Paciente_Cirugias;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_Cirugias.prototype, "id_cirugia", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], Paciente_Cirugias.prototype, "fecha", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => nombre_Cirugia_1.nombre_Cirugia),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_Cirugias.prototype, "id_nombre_cirugia", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => nombre_Cirugia_1.nombre_Cirugia),
    __metadata("design:type", nombre_Cirugia_1.nombre_Cirugia)
], Paciente_Cirugias.prototype, "nombre_cirugia", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Length)({ min: 10, max: 255 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Paciente_Cirugias.prototype, "descripcion", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Medicos_1.Medicos),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_Cirugias.prototype, "id_medico", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Medicos_1.Medicos),
    __metadata("design:type", Medicos_1.Medicos)
], Paciente_Cirugias.prototype, "medico", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Pacientes_1.Pacientes),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_Cirugias.prototype, "id_paciente", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Pacientes_1.Pacientes),
    __metadata("design:type", Pacientes_1.Pacientes)
], Paciente_Cirugias.prototype, "paciente", void 0);
exports.Paciente_Cirugias = Paciente_Cirugias = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "paciente_cirugias" })
], Paciente_Cirugias);
//# sourceMappingURL=Paciente_Cirugias.js.map