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
exports.CategoriaSeguro = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Paciente_seguro_medico_1 = require("./Paciente_seguro_medico.js");
let CategoriaSeguro = class CategoriaSeguro extends sequelize_typescript_1.Model {
};
exports.CategoriaSeguro = CategoriaSeguro;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], CategoriaSeguro.prototype, "id_Categoria_Seguro", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], CategoriaSeguro.prototype, "nombre", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Paciente_seguro_medico_1.Paciente_seguro_medico),
    __metadata("design:type", Array)
], CategoriaSeguro.prototype, "paciente_seguro_medico", void 0);
exports.CategoriaSeguro = CategoriaSeguro = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "categoriasseguros" })
], CategoriaSeguro);
//# sourceMappingURL=CategoriaSeguro.js.map