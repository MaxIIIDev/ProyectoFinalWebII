"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Personal_de_admision = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Usuarios_1 = require("./Usuarios");
let Personal_de_admision = class Personal_de_admision extends sequelize_typescript_1.Model {
};
exports.Personal_de_admision = Personal_de_admision;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Personal_de_admision.prototype, "id_personal_de_admision", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Length)({ min: 3, max: 255 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Personal_de_admision.prototype, "nombre", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Length)({ min: 3, max: 255 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Personal_de_admision.prototype, "apellido", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Personal_de_admision.prototype, "dni", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE)
], Personal_de_admision.prototype, "fecha_nac", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Personal_de_admision.prototype, "edad", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Length)({ min: 6, max: 20 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Personal_de_admision.prototype, "genero", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Personal_de_admision.prototype, "telefono", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Personal_de_admision.prototype, "telefono_De_Emergencia", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Personal_de_admision.prototype, "direccion", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Usuarios_1.Usuarios),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], Personal_de_admision.prototype, "id_usuario", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Usuarios_1.Usuarios)
], Personal_de_admision.prototype, "usuario", void 0);
exports.Personal_de_admision = Personal_de_admision = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "personal_de_admision" })
], Personal_de_admision);
