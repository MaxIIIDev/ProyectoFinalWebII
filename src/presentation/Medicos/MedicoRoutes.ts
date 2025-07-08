import { Router } from "express";
import { MedicoController } from "./MedicoController";
import { MiddlewareFor } from "../../middlewares/MiddlewareFor";

export class MedicoRoutes{

    static routes():Router{

        const router = Router();
        const controller = new MedicoController();
        router.use(MiddlewareFor.InicializarSessionMedico)
        const middlewares = [
            MiddlewareFor.verificarSessionPaciente("/medicos/lista/admisiones","warning","Se ha cerrado la sesion del paciente"),
            MiddlewareFor.verificarSessionAdmision("/medicos/lista/admisiones","warning","No se selecciono una admision"),
        ]

        router.get("/", controller.VistaInicioMedico)
        router.get("/lista/admisiones", controller.VistaListaAdmisiones)
        router.get("/view/paciente/seleccionado", controller.vistaPacienteSeleccionado)
        router.get("/view/diagnosticos", ...middlewares,controller.vistaListaDiagnosticos)
        router.get("/view/historial", ...middlewares,controller.VistaHistorialMedico)
        router.get("/view/historial/alergias", ...middlewares,controller.VistaHistorialDeAlergias)
        router.get("/view/historial/medicamentos/actuales", ...middlewares,controller.VistaHistorialDeMedicamentosActuales)
        router.get("/view/historial/antecedentes/familiares", ...middlewares,controller.VistaHistorialDeAntecedentesFamiliares)
        router.get("/view/historial/cirugias", ...middlewares,controller.VistaHistorialDeCirugias)
        router.get("/view/evaluacion/fisica", ...middlewares,controller.VistaEvaluacionesFisicasActual)
        router.get("/view/historial/evaluacion/fisica", ...middlewares,controller.VistaHistorialDeEvaluacionesFisicas)
        
        return router;
    }
}