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
exports.Tipo_De_Diagnostico = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Paciente_Diagnosticos_1 = require("./Paciente_Diagnosticos");
let Tipo_De_Diagnostico = class Tipo_De_Diagnostico extends sequelize_typescript_1.Model {
};
exports.Tipo_De_Diagnostico = Tipo_De_Diagnostico;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Tipo_De_Diagnostico.prototype, "id_tipo_de_diagnostico", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Length)({ min: 3, max: 255 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Tipo_De_Diagnostico.prototype, "nombre", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Length)({ min: 3, max: 255 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Tipo_De_Diagnostico.prototype, "descripcion", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Paciente_Diagnosticos_1.Paciente_Diagnosticos),
    __metadata("design:type", Array)
], Tipo_De_Diagnostico.prototype, "paciente_diagnosticos", void 0);
exports.Tipo_De_Diagnostico = Tipo_De_Diagnostico = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "tipo_de_diagnostico" })
], Tipo_De_Diagnostico);
//# sourceMappingURL=Tipo_De_Diagnostico.js.map