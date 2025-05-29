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
exports.Hospital_habitaciones = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Hospital_camas_1 = require("./Hospital_camas.js");
const Hospital_alas_1 = require("./Hospital_alas.js");
let Hospital_habitaciones = class Hospital_habitaciones extends sequelize_typescript_1.Model {
};
exports.Hospital_habitaciones = Hospital_habitaciones;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Hospital_habitaciones.prototype, "id_Habitacion", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Hospital_habitaciones.prototype, "nro_Habitacion", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotNull,
    (0, sequelize_typescript_1.Default)(0),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Hospital_habitaciones.prototype, "cantidad_Camas", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Hospital_camas_1.Hospital_camas),
    __metadata("design:type", Array)
], Hospital_habitaciones.prototype, "camas", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Hospital_alas_1.Hospital_alas),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Hospital_habitaciones.prototype, "id_ala", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Hospital_alas_1.Hospital_alas),
    __metadata("design:type", Hospital_alas_1.Hospital_alas)
], Hospital_habitaciones.prototype, "ala", void 0);
exports.Hospital_habitaciones = Hospital_habitaciones = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "hospital_habitaciones" })
], Hospital_habitaciones);
//# sourceMappingURL=Hospital_habitaciones.js.map