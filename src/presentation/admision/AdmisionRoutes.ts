import { Router } from "express";
import { AdmisionController } from "./AdmisionController";
import { Conexion } from "../../data/conexion";




export class AdmisionRoutes{

    static admisionRoutes(conexionBd: Conexion): Router{

        const router = Router();
        const controller = new AdmisionController(conexionBd);
        let sequelize = conexionBd.getSequelize;
        
        router.get("/", controller.admitir );


        return router
    }


}