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
exports.Admision = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const motivo_De_Internacion_1 = require("./motivo_De_Internacion");
const Hospital_camas_1 = require("./Hospital_camas");
const Pacientes_1 = require("./Pacientes");
const Prioridad_De_Atencion_1 = require("./Prioridad_De_Atencion");
const Sintomas_1 = require("./Sintomas");
const tipo_De_Admision_1 = require("./tipo_De_Admision");
let Admision = class Admision extends sequelize_typescript_1.Model {
};
exports.Admision = Admision;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Admision.prototype, "id_Admision", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Length)({ min: 3, max: 255 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Admision.prototype, "estado", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => motivo_De_Internacion_1.motivo_De_Internacion),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Admision.prototype, "id_motivo_de_Internacion", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => motivo_De_Internacion_1.motivo_De_Internacion),
    __metadata("design:type", motivo_De_Internacion_1.motivo_De_Internacion)
], Admision.prototype, "motivo_de_internacion", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Sintomas_1.Sintomas),
    __metadata("design:type", Array)
], Admision.prototype, "sintomas", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Prioridad_De_Atencion_1.Prioridad_De_Atencion),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Admision.prototype, "id_prioridad_de_atencion", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Prioridad_De_Atencion_1.Prioridad_De_Atencion),
    __metadata("design:type", String)
], Admision.prototype, "prioridad_de_atencion", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => tipo_De_Admision_1.tipo_De_Admision),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Admision.prototype, "id_tipo_de_admision", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => tipo_De_Admision_1.tipo_De_Admision),
    __metadata("design:type", tipo_De_Admision_1.tipo_De_Admision)
], Admision.prototype, "tipo_de_admision", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], Admision.prototype, "fecha_De_Admision", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], Admision.prototype, "fecha_De_Actualizacion", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Pacientes_1.Pacientes),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Admision.prototype, "id_Paciente", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Pacientes_1.Pacientes),
    __metadata("design:type", Pacientes_1.Pacientes)
], Admision.prototype, "pacientes", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Hospital_camas_1.Hospital_camas),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Admision.prototype, "id_Cama", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Hospital_camas_1.Hospital_camas),
    __metadata("design:type", Hospital_camas_1.Hospital_camas)
], Admision.prototype, "camas", void 0);
exports.Admision = Admision = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "admisiones" })
], Admision);
//# sourceMappingURL=Admision.js.map