"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conexion = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("../config/config");
const init_1 = require("./models/init");
//import { seedDatabase } from "./seed";
class Conexion {
    constructor() {
        this.sequelize = new sequelize_typescript_1.Sequelize(config_1.config.development.database, config_1.config.development.username, config_1.config.development.password, {
            host: config_1.config.development.host,
            dialect: config_1.config.development.dialect,
            port: config_1.config.development.port,
            models: init_1.importaciones
        });
    }
    static get getConexion() {
        if (!Conexion.conexion) {
            Conexion.conexion = new Conexion();
        }
        return Conexion.conexion;
    }
    getSequelize() {
        return this.sequelize;
    }
    authenticated() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sequelize.authenticate();
                console.log("Conexion exitosa con la bd");
            }
            catch (error) {
                console.log("No se pudo establecer la conexion con la bd");
                console.log(error);
            }
        });
    }
    cerrarConexion() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sequelize.close();
                console.log("La conexion con la bd fue cerrada");
            }
            catch (error) {
                console.log("Hubo un error al cerrar la conexion con la bd");
            }
        });
    }
    sync() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Conexion.getConexion.getSequelize().sync({
                    force: false,
                    alter: true
                });
                console.log("sincronizado");
            }
            catch (error) {
                console.log("error de sincronizacion: " + error);
            }
        });
    }
    // public async runSeed(){
    //     try{
    //         await seedDatabase();
    //         console.log("Seeds ejecutados correctamente");
    //     }catch(error){
    //         console.error("Error al ejecutar los seeds: " , error)
    //     }
    // }
    arrancarLaBd() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.authenticated();
            //await this.sync()
            // await this.runSeed()
        });
    }
}
exports.Conexion = Conexion;
