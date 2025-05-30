"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipo_De_Admision = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Admision_1 = require("./Admision");
let tipo_De_Admision = class tipo_De_Admision extends sequelize_typescript_1.Model {
};
exports.tipo_De_Admision = tipo_De_Admision;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
], tipo_De_Admision.prototype, "id_tipo_de_admision", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Length)({ min: 3, max: 255 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], tipo_De_Admision.prototype, "tipo", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Admision_1.Admision)
], tipo_De_Admision.prototype, "admision", void 0);
exports.tipo_De_Admision = tipo_De_Admision = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "tipo_de_admision" })
], tipo_De_Admision);
