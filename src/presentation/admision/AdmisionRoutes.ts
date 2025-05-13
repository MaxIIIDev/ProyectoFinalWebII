import { Router } from "express";
import { AdmisionController } from "./AdmisionController";
import { Conexion } from "../../data/conexion";




export class AdmisionRoutes{

    static admisionRoutes(conexionBd: Conexion): Router{

        
        const router = Router();
        const controller = new AdmisionController(conexionBd);
        
        //vistas
        router.get("/", controller.vistaPrincipal)
        router.get("/emergencia", controller.vistaEmergencia)
        router.post("/emergencia/habitacion", controller.vistaHabitacionDeEmergencia)

        router.post("/register/patient", controller.registrarPaciente);
        router.put("/update/patient", controller.actualizarPaciente)
        router.post("/register/asign/secure", controller.registrarYAsignarSeguroMedico)//Armar la relacion entre ambos al registrar
        router.put("/update/secure", controller.actualizarSeguroMedico)//Armar la relacion entre ambos al registrar
       // router.get("/get/getRooms/:genero/:ala", controller.getHabitaciones)
        return router
    }


}