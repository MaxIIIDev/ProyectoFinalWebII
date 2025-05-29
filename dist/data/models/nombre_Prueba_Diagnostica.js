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
exports.nombre_Prueba_Diagnostica = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Paciente_pruebas_diagnosticas_1 = require("./Paciente_pruebas_diagnosticas");
let nombre_Prueba_Diagnostica = class nombre_Prueba_Diagnostica extends sequelize_typescript_1.Model {
};
exports.nombre_Prueba_Diagnostica = nombre_Prueba_Diagnostica;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], nombre_Prueba_Diagnostica.prototype, "id_nombre_prueba_diagnostica", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], nombre_Prueba_Diagnostica.prototype, "nombre", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Paciente_pruebas_diagnosticas_1.Paciente_pruebas_diagnosticas),
    __metadata("design:type", Array)
], nombre_Prueba_Diagnostica.prototype, "paciente_pruebas_diagnosticas", void 0);
exports.nombre_Prueba_Diagnostica = nombre_Prueba_Diagnostica = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "nombre_prueba_diagnostica" })
], nombre_Prueba_Diagnostica);
//# sourceMappingURL=nombre_Prueba_Diagnostica.js.map