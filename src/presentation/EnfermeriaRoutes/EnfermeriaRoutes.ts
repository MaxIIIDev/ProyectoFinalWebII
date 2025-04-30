import { Router } from "express";
import { EnfermerosController } from "./EnfermerosController";



export class EnfermeriaRoutes{


    static get enfermeriaRoutes():Router{

        const router = Router();
        const controller = new EnfermerosController();

        router.get("/hola", controller.getEnfermeros);


        return router
    }

}