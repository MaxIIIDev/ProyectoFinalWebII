import { Router } from "express";
import { EnfermerosController } from "./EnfermerosController";
import { Conexion } from "../../data/conexion";



export class EnfermeriaRoutes{


    static  enfermeriaRoutes(conexionBd:Conexion):Router{

        const router = Router();
        const controller = new EnfermerosController();

        router.get("/hola", controller.getEnfermeros);
        router.get("/test", controller.test)

        return router
    }

}