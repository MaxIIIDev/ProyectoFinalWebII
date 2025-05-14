import { Router } from "express";
import { AdmisionController } from "./AdmisionController";
import { Conexion } from "../../data/conexion";




export class AdmisionRoutes{

    static admisionRoutes(conexionBd: Conexion): Router{

        
        const router = Router();
        const controller = new AdmisionController(conexionBd);
        
        //vistas
        router.get("/", controller.vistaPrincipal)//todo:Comprobado
        router.get("/emergencia", controller.vistaEmergencia)//todo:Comprobado
        router.post("/emergencia/habitacion", controller.vistaHabitacionDeEmergencia)

        //GETTERS PACIENTES
        router.get("/find/paciente/:dni", controller.buscarPacientePorDni) //devuelve la informacion del paciente //todo:Comprobado
        router.get("/get/info/paciente/:dni", controller.buscarTodaLaInformacionDelPaciente) //Trae la info del paciente incluyendo el seguro medico //todo:Comprobado

        //POST PACIENTES
        router.post("/register/paciente", controller.registrarPaciente);//todo:Comprobado
        router.put("/update/paciente", controller.actualizarPaciente)//todo:Comprobado
        
        //SEGUROS MEDICOS
        router.get("/get/seguro/medico/:numero", controller.getSeguroMedico); //obtener seguro medico por numero //todo:Comprobado
        router.post("/register/asign/secure", controller.registrarYAsignarSeguroMedico)//Crea el seguro medico y lo asigna al paciente //todo: Comprobado
        router.put("/update/secure", controller.actualizarSeguroMedico)//actualizar Paciente//todo:Comprobado
       
        //ADMICION
        //router.get("/getAdmision")
        // router.post("/create/admision",)
        // router.put("/update/admision")
        // router.delete("/delete/admision")

        //TURNOS
        //router.post("/crear/turno")
        // router.get("/get/turno")
        // router.put("/actualizar/turno")
        // router.delete("/delete/turno")
        return router
    }


}