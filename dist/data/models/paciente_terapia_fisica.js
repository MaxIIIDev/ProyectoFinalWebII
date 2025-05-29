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
exports.paciente_terapia_fisica = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Pacientes_1 = require("./Pacientes");
let paciente_terapia_fisica = class paciente_terapia_fisica extends sequelize_typescript_1.Model {
};
exports.paciente_terapia_fisica = paciente_terapia_fisica;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], paciente_terapia_fisica.prototype, "id_terapia_fisica", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], paciente_terapia_fisica.prototype, "fecha", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Length)({ min: 10, max: 255 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], paciente_terapia_fisica.prototype, "nombre", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], paciente_terapia_fisica.prototype, "duracion", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Pacientes_1.Pacientes),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], paciente_terapia_fisica.prototype, "id_paciente", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Pacientes_1.Pacientes),
    __metadata("design:type", Pacientes_1.Pacientes
    // @ForeignKey(()=> paciente_tratamientos)
    // @Column(DataType.INTEGER)
    // declare id_tratamiento: number
    // @BelongsTo(()=> paciente_tratamientos)
    // declare tratamiento: paciente_tratamientos
    )
], paciente_terapia_fisica.prototype, "paciente", void 0);
exports.paciente_terapia_fisica = paciente_terapia_fisica = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "paciente_terapia_fisica" })
], paciente_terapia_fisica);
//# sourceMappingURL=paciente_terapia_fisica.js.map