import { Request, Response, Router } from "express";
import { AdmisionRoutes } from "./admision/AdmisionRoutes";
import { EnfermeriaRoutes } from "./Enfermeria/EnfermeriaRoutes";
import { Conexion } from "../data/conexion";
import { AuthRoutes } from "./Auth/AuthRoutes";


//Todo: ESTAS SON LAS RUTAS DE TODA LA APLICACION
export class AppRoutes{

    static get routes():Router{

        const router = Router();
        const conexionBd = Conexion.getConexion;
        router.get("/", function(req:Request,res:Response){
            res.redirect("/admision");
            return;
        })
        router.use("/admision", AdmisionRoutes.admisionRoutes(conexionBd))
        router.use("/enfermeria", EnfermeriaRoutes.enfermeriaRoutes(conexionBd))
        // router.use("/medicos",MedicoRoutes.medicoRoutes(conexionBd));
        router.use("/auth", AuthRoutes.authRoutes());
        
        return router
    }

}