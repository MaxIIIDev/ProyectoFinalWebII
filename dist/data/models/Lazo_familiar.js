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
exports.Lazo_Familiar = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Paciente_antecedentes_familiares_1 = require("./Paciente_antecedentes_familiares");
let Lazo_Familiar = class Lazo_Familiar extends sequelize_typescript_1.Model {
};
exports.Lazo_Familiar = Lazo_Familiar;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Lazo_Familiar.prototype, "id_Lazo_Familiar", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Lazo_Familiar.prototype, "lazo", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Paciente_antecedentes_familiares_1.Paciente_antecedentes_familiares),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Lazo_Familiar.prototype, "id_paciente_antecedente_familiar", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Paciente_antecedentes_familiares_1.Paciente_antecedentes_familiares),
    __metadata("design:type", Paciente_antecedentes_familiares_1.Paciente_antecedentes_familiares)
], Lazo_Familiar.prototype, "paciente_antecedente_familiar", void 0);
exports.Lazo_Familiar = Lazo_Familiar = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "lazo_familiar" })
], Lazo_Familiar);
//# sourceMappingURL=Lazo_familiar.js.map