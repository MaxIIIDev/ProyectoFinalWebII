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
exports.Sintomas = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Admision_1 = require("./Admision");
const Paciente_Diagnosticos_1 = require("./Paciente_Diagnosticos");
let Sintomas = class Sintomas extends sequelize_typescript_1.Model {
};
exports.Sintomas = Sintomas;
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Sintomas.prototype, "id_Sintoma", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Sintomas.prototype, "nombre", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Admision_1.Admision),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Sintomas.prototype, "id_Admision", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Admision_1.Admision),
    __metadata("design:type", Admision_1.Admision)
], Sintomas.prototype, "admision", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Paciente_Diagnosticos_1.Paciente_Diagnosticos),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Sintomas.prototype, "id_Paciente_Diagnosticos", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Paciente_Diagnosticos_1.Paciente_Diagnosticos),
    __metadata("design:type", Paciente_Diagnosticos_1.Paciente_Diagnosticos)
], Sintomas.prototype, "Paciente_Diagnosticos", void 0);
exports.Sintomas = Sintomas = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "sintomas" })
], Sintomas);
//# sourceMappingURL=Sintomas.js.map