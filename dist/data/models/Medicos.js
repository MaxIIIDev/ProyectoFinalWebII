"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medicos = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Usuarios_1 = require("./Usuarios");
const Paciente_Cirugias_1 = require("./Paciente_Cirugias");
const Paciente_Diagnosticos_1 = require("./Paciente_Diagnosticos");
const Paciente_recetas_1 = require("./Paciente_recetas");
const Turnos_1 = require("./Turnos");
const Especialidades_1 = require("./Especialidades");
let Medicos = class Medicos extends sequelize_typescript_1.Model {
};
exports.Medicos = Medicos;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Medicos.prototype, "id_Medico", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Length)({ min: 3, max: 255 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Medicos.prototype, "nombre", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Length)({ min: 3, max: 255 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Medicos.prototype, "apellido", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Medicos.prototype, "dni", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE)
], Medicos.prototype, "fecha_nac", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Medicos.prototype, "edad", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DOUBLE)
], Medicos.prototype, "peso", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Length)({ min: 6, max: 20 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Medicos.prototype, "genero", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Medicos.prototype, "telefono", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Medicos.prototype, "telefono_De_Emergencia", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Medicos.prototype, "direccion", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Especialidades_1.Especialidades),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Medicos.prototype, "id_Especialidad", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Especialidades_1.Especialidades)
], Medicos.prototype, "especialidad", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Paciente_Cirugias_1.Paciente_Cirugias)
], Medicos.prototype, "cirugia", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Usuarios_1.Usuarios),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Medicos.prototype, "id_usuario", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Usuarios_1.Usuarios)
], Medicos.prototype, "usuario", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Paciente_Diagnosticos_1.Paciente_Diagnosticos)
], Medicos.prototype, "diagnostico", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Paciente_recetas_1.Paciente_recetas)
], Medicos.prototype, "recetas", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Turnos_1.Turnos)
], Medicos.prototype, "turnos", void 0);
exports.Medicos = Medicos = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "medicos" })
], Medicos);
