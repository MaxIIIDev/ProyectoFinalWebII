import { Router } from "express";
import { AdmisionController } from "./AdmisionController";



export class AdmisionRoutes{

    static get admisionRoutes(): Router{

        const router = Router();
        const controller = new AdmisionController();
        router.get("/", controller.admitir );


        return router
    }


}