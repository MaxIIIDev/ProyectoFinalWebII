import { Router } from "express";
import { EnfermerosController } from "./EnfermerosController";
import { Conexion } from "../../data/conexion";



export class EnfermeriaRoutes{


    static  enfermeriaRoutes(conexionBd:Conexion):Router{

        const router = Router();
        const controller = new EnfermerosController();

        router.get("/", controller.vistaPrincipal);
        router.get("/view/paciente", controller.vistaPacienteSeleccionado);
        router.get("/view/actualizar/paciente", controller.vistaActualizarInformacionPaciente);
        router.get("/view/historial/paciente", controller.vistaHistorialMedico);
        router.get("/view/alergias/paciente", controller.vistaListaAlergias);
        router.get("/view/crear/alergia", controller.vistaCrearAlergia);
        router.post("/actualizar/paciente",controller.actualizarInformacionPaciente)
        router.get("/test", controller.test)

        return router
    }

}