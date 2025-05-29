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
exports.Enfermero = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Usuarios_1 = require("./Usuarios.js");
const paciente_tratamientos_1 = require("./paciente_tratamientos.js");
const Paciente_Evaluacion_Fisica_1 = require("./Paciente_Evaluacion_Fisica.js");
let Enfermero = class Enfermero extends sequelize_typescript_1.Model {
};
exports.Enfermero = Enfermero;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Enfermero.prototype, "id_Enfermero", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Length)({ min: 3, max: 255 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Enfermero.prototype, "nombre", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Length)({ min: 3, max: 255 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Enfermero.prototype, "apellido", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Enfermero.prototype, "dni", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], Enfermero.prototype, "fecha_nac", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Enfermero.prototype, "edad", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DOUBLE),
    __metadata("design:type", Number)
], Enfermero.prototype, "peso", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Length)({ min: 6, max: 20 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Enfermero.prototype, "genero", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Enfermero.prototype, "telefono", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Enfermero.prototype, "telefono_de_emergencia", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Enfermero.prototype, "direccion", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Usuarios_1.Usuarios),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Enfermero.prototype, "id_usuario", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Usuarios_1.Usuarios),
    __metadata("design:type", Usuarios_1.Usuarios)
], Enfermero.prototype, "usuario", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Paciente_Evaluacion_Fisica_1.Paciente_Evaluacion_Fisica),
    __metadata("design:type", Array)
], Enfermero.prototype, "evaluaciones_fisicas", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => paciente_tratamientos_1.paciente_tratamientos),
    __metadata("design:type", paciente_tratamientos_1.paciente_tratamientos)
], Enfermero.prototype, "tratamiento", void 0);
exports.Enfermero = Enfermero = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "enfermeros" })
], Enfermero);
//# sourceMappingURL=Enfermero.js.map