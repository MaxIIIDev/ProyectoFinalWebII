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
exports.paciente_tratamientos = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Paciente_Alergias_1 = require("./Paciente_Alergias");
const Paciente_Diagnosticos_1 = require("./Paciente_Diagnosticos");
const Pacientes_1 = require("./Pacientes");
const Medicamentos_1 = require("./Medicamentos");
const Enfermero_1 = require("./Enfermero");
const Tipo_De_tratamiento_1 = require("./Tipo_De_tratamiento");
let paciente_tratamientos = class paciente_tratamientos extends sequelize_typescript_1.Model {
};
exports.paciente_tratamientos = paciente_tratamientos;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], paciente_tratamientos.prototype, "id_tratamiento", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Tipo_De_tratamiento_1.Tipo_De_tratamiento),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], paciente_tratamientos.prototype, "id_tipo_de_tratamiento", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Tipo_De_tratamiento_1.Tipo_De_tratamiento),
    __metadata("design:type", Tipo_De_tratamiento_1.Tipo_De_tratamiento)
], paciente_tratamientos.prototype, "tipo_de_tratamiento", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], paciente_tratamientos.prototype, "detalle", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DOUBLE),
    __metadata("design:type", Number)
], paciente_tratamientos.prototype, "cantidad_suministrada", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], paciente_tratamientos.prototype, "fecha_de_inicio", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], paciente_tratamientos.prototype, "fecha_de_fin", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Paciente_Alergias_1.Paciente_Alergias),
    __metadata("design:type", Array)
], paciente_tratamientos.prototype, "alergias", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Paciente_Diagnosticos_1.Paciente_Diagnosticos),
    __metadata("design:type", Paciente_Diagnosticos_1.Paciente_Diagnosticos
    // @HasOne(()=> paciente_tratamientos)
    // declare tratamiento: paciente_tratamientos
    )
], paciente_tratamientos.prototype, "diagnostico", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Pacientes_1.Pacientes),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], paciente_tratamientos.prototype, "id_paciente", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Pacientes_1.Pacientes),
    __metadata("design:type", Pacientes_1.Pacientes)
], paciente_tratamientos.prototype, "paciente", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Medicamentos_1.Medicamentos),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], paciente_tratamientos.prototype, "id_medicamento", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Medicamentos_1.Medicamentos),
    __metadata("design:type", Medicamentos_1.Medicamentos)
], paciente_tratamientos.prototype, "medicamento", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Enfermero_1.Enfermero),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], paciente_tratamientos.prototype, "id_enfermero", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Enfermero_1.Enfermero),
    __metadata("design:type", Enfermero_1.Enfermero)
], paciente_tratamientos.prototype, "enfermero", void 0);
exports.paciente_tratamientos = paciente_tratamientos = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "paciente_tratamientos" })
], paciente_tratamientos);
//# sourceMappingURL=paciente_tratamientos.js.map