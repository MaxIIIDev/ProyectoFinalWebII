import { Router } from "express";
import { AdmisionRoutes } from "./admisionRoutes/AdmisionRoutes";
import { EnfermeriaRoutes } from "./EnfermeriaRoutes/EnfermeriaRoutes";


//Todo: ESTAS SON LAS RUTAS DE TODA LA APLICACION
export class AppRoutes{

    static get routes():Router{

        const router = Router();

        router.use("/admision", AdmisionRoutes.admisionRoutes)
        router.use("/enfermeria", EnfermeriaRoutes.enfermeriaRoutes)

        
        return router
    }

}