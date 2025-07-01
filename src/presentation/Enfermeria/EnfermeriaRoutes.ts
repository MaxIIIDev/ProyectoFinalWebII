import { Router } from "express";
import { EnfermerosController } from "./EnfermerosController";
import { Conexion } from "../../data/conexion";
import { MiddlewareFor } from "../../middlewares/MiddlewareFor";



export class EnfermeriaRoutes{


    static  enfermeriaRoutes(conexionBd:Conexion):Router{

        const router = Router();
        const controller = new EnfermerosController();
        router.use(MiddlewareFor.InicializarSessionEnfermero)

        router.get("/test", controller.test)

        router.get("/", controller.vistaPrincipal);
        router.get("/view/paciente", controller.vistaPacienteSeleccionado);
        router.get("/view/actualizar/paciente", controller.vistaActualizarInformacionPaciente);
        router.get("/view/historial/paciente", controller.vistaHistorialMedico);
        router.get("/view/alergias/paciente", controller.vistaListaAlergias);
        router.get("/view/crear/alergia", controller.vistaCrearAlergia);
        router.get("/view/actualizar/alergia", controller.vistaActualizarAlergia);

        router.post("/actualizar/paciente",controller.actualizarInformacionPaciente)
        router.post("/crearAlergia", controller.crearAlergia)
        router.post("/actualizarAlergia", controller.actualizarAlergia);
       
        

        return router
    }

}