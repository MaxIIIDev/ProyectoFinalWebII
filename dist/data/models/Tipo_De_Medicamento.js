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
exports.Tipo_De_Medicamento = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Medicamentos_1 = require("./Medicamentos");
let Tipo_De_Medicamento = class Tipo_De_Medicamento extends sequelize_typescript_1.Model {
};
exports.Tipo_De_Medicamento = Tipo_De_Medicamento;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Tipo_De_Medicamento.prototype, "id_tipo_de_medicamento", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Tipo_De_Medicamento.prototype, "nombre", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Medicamentos_1.Medicamentos),
    __metadata("design:type", Medicamentos_1.Medicamentos)
], Tipo_De_Medicamento.prototype, "medicamentos", void 0);
exports.Tipo_De_Medicamento = Tipo_De_Medicamento = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "tipo_de_medicamento" })
], Tipo_De_Medicamento);
//# sourceMappingURL=Tipo_De_Medicamento.js.map