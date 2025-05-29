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
exports.motivo_De_Internacion = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Admision_1 = require("./Admision");
let motivo_De_Internacion = class motivo_De_Internacion extends sequelize_typescript_1.Model {
};
exports.motivo_De_Internacion = motivo_De_Internacion;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], motivo_De_Internacion.prototype, "id_motivo_de_Internacion", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Length)({ min: 3, max: 255 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], motivo_De_Internacion.prototype, "motivo", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Admision_1.Admision),
    __metadata("design:type", Admision_1.Admision)
], motivo_De_Internacion.prototype, "admision", void 0);
exports.motivo_De_Internacion = motivo_De_Internacion = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "motivo_de_internacion" })
], motivo_De_Internacion);
//# sourceMappingURL=motivo_De_Internacion.js.map