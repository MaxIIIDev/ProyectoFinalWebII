"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuarios = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Enfermero_1 = require("./Enfermero");
const Medicos_1 = require("./Medicos");
const Roles_1 = require("./Roles");
let Usuarios = class Usuarios extends sequelize_typescript_1.Model {
};
exports.Usuarios = Usuarios;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Usuarios.prototype, "id_Usuario", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.IsEmail,
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Usuarios.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Usuarios.prototype, "password_hash", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN)
], Usuarios.prototype, "activo", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(0),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Usuarios.prototype, "intentos_fallidos", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Enfermero_1.Enfermero)
], Usuarios.prototype, "enfermero", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Medicos_1.Medicos)
], Usuarios.prototype, "medico", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Roles_1.Roles),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Usuarios.prototype, "id_Rol", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Roles_1.Roles)
], Usuarios.prototype, "rol", void 0);
exports.Usuarios = Usuarios = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "usuarios" })
], Usuarios);
