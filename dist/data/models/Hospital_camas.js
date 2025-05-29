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
exports.Hospital_camas = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Admision_1 = require("./Admision");
const Hospital_habitaciones_1 = require("./Hospital_habitaciones");
let Hospital_camas = class Hospital_camas extends sequelize_typescript_1.Model {
};
exports.Hospital_camas = Hospital_camas;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Hospital_camas.prototype, "id_Cama", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Default)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Hospital_camas.prototype, "disponible", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Admision_1.Admision),
    __metadata("design:type", Admision_1.Admision)
], Hospital_camas.prototype, "admision", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Hospital_habitaciones_1.Hospital_habitaciones),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Hospital_camas.prototype, "id_habitacion", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Hospital_habitaciones_1.Hospital_habitaciones),
    __metadata("design:type", Hospital_habitaciones_1.Hospital_habitaciones)
], Hospital_camas.prototype, "habitacion", void 0);
exports.Hospital_camas = Hospital_camas = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "hospital_camas" })
], Hospital_camas);
//# sourceMappingURL=Hospital_camas.js.map