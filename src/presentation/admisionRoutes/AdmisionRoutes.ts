import { Router } from "express";
import { AdmisionController } from "./AdmisionController";
import { Conexion } from "../../data/conexion";



export class AdmisionRoutes{

    static admisionRoutes(conexionBd: Conexion): Router{

        const router = Router();
        const controller = new AdmisionController(conexionBd);
        router.get("/", controller.admitir );


        return router
    }


}