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
exports.Paciente_seguro_medico = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Pacientes_1 = require("./Pacientes");
const CategoriaSeguro_1 = require("./CategoriaSeguro");
const Mutuales_1 = require("./Mutuales");
let Paciente_seguro_medico = class Paciente_seguro_medico extends sequelize_typescript_1.Model {
};
exports.Paciente_seguro_medico = Paciente_seguro_medico;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_seguro_medico.prototype, "id_seguro_medico", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Mutuales_1.Mutuales),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_seguro_medico.prototype, "id_mutual", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Mutuales_1.Mutuales),
    __metadata("design:type", Mutuales_1.Mutuales)
], Paciente_seguro_medico.prototype, "mutual", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_seguro_medico.prototype, "numero", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Paciente_seguro_medico.prototype, "estado", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => CategoriaSeguro_1.CategoriaSeguro),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Paciente_seguro_medico.prototype, "id_categoria_seguro", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => CategoriaSeguro_1.CategoriaSeguro),
    __metadata("design:type", CategoriaSeguro_1.CategoriaSeguro)
], Paciente_seguro_medico.prototype, "categoria_seguro", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Pacientes_1.Pacientes),
    __metadata("design:type", Pacientes_1.Pacientes)
], Paciente_seguro_medico.prototype, "paciente", void 0);
exports.Paciente_seguro_medico = Paciente_seguro_medico = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "paciente_seguro_medico" })
], Paciente_seguro_medico);
//# sourceMappingURL=Paciente_seguro_medico.js.map