import { Router } from "express";
import { AuthController } from "./AuthController";
import { Conexion } from "../../data/conexion";


export class AuthRoutes{

    static authRoutes = ():Router =>  {
        
        const router = Router();
        const controller = new AuthController();
        
        router.get("/login",controller.viewLogin);
        router.post("/login", controller.Login)
        

        return router

    }

}
