"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const AdmisionRoutes_1 = require("./admision/AdmisionRoutes");
const EnfermeriaRoutes_1 = require("./Enfermeria/EnfermeriaRoutes");
const conexion_1 = require("../data/conexion");
const AuthRoutes_1 = require("./Auth/AuthRoutes");
//Todo: ESTAS SON LAS RUTAS DE TODA LA APLICACION
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const conexionBd = conexion_1.Conexion.getConexion;
        router.get("/", function (req, res) {
            res.redirect("/admision");
            return;
        });
        router.use("/admision", AdmisionRoutes_1.AdmisionRoutes.admisionRoutes(conexionBd));
        router.use("/enfermeria", EnfermeriaRoutes_1.EnfermeriaRoutes.enfermeriaRoutes(conexionBd));
        // router.use("/medicos",MedicoRoutes.medicoRoutes(conexionBd));
        router.use("/auth", AuthRoutes_1.AuthRoutes.authRoutes());
        return router;
    }
}
exports.AppRoutes = AppRoutes;
