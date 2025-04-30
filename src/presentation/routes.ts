import { Router } from "express";
import { AdmisionRoutes } from "./admisionRoutes/AdmisionRoutes";
import { EnfermeriaRoutes } from "./EnfermeriaRoutes/EnfermeriaRoutes";
import { Conexion } from "../data/conexion";


//Todo: ESTAS SON LAS RUTAS DE TODA LA APLICACION
export class AppRoutes{

    static get routes():Router{

        const router = Router();
        const conexionBd = Conexion.getConexion;
        router.use("/admision", AdmisionRoutes.admisionRoutes(conexionBd))
        router.use("/enfermeria", EnfermeriaRoutes.enfermeriaRoutes(conexionBd))

        
        return router
    }

}