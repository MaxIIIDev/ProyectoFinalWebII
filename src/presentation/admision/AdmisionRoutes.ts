import { Router } from "express";
import { AdmisionController } from "./AdmisionController";
import { Conexion } from "../../data/conexion";




export class AdmisionRoutes{

    static admisionRoutes(conexionBd: Conexion): Router{

        
        const router = Router();
        const controller = new AdmisionController(conexionBd);
        
        
        router.post("/register/patient", controller.registrarPaciente);
        router.put("/update/patient", controller.actualizarPaciente)
        router.post("/register/asign/secure", controller.registrarYAsignarSeguroMedico)//Armar la relacion entre ambos al registrar
        router.put("/update/secure", controller.actualizarSeguroMedico)//Armar la relacion entre ambos al registrar
        router.get("/get/getRooms/:genero/:ala", controller.getHabitaciones)
        return router
    }


}