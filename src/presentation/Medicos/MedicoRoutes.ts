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
        router.get("/view/diagnostico/registrar", ...middlewares,controller.VistaRegistrarDiagnostico)
        router.get("/view/diagnostico/actualizar", ...middlewares,controller.VistaActualizarDiagnostico)
        router.get("/view/pruebas/diagnosticas", ...middlewares,controller.VistaListaPruebasDiagnosticas)
        router.get("/view/pruebas/diagnosticas/registrar", ...middlewares,controller.VistaCrearPruebaDiagnostica)
        router.get("/view/pruebas/diagnosticas/actualizar", ...middlewares,controller.VistaActualizarPruebaDiagnostica)
        router.get("/view/historial", ...middlewares,controller.VistaHistorialMedico)
        router.get("/view/historial/alergias", ...middlewares,controller.VistaHistorialDeAlergias)
        router.get("/view/historial/medicamentos/actuales", ...middlewares,controller.VistaHistorialDeMedicamentosActuales)
        router.get("/view/historial/antecedentes/familiares", ...middlewares,controller.VistaHistorialDeAntecedentesFamiliares)
        router.get("/view/historial/cirugias", ...middlewares,controller.VistaHistorialDeCirugias)
        router.get("/view/evaluacion/fisica", ...middlewares,controller.VistaEvaluacionesFisicasActual)
        router.get("/view/historial/evaluacion/fisica", ...middlewares,controller.VistaHistorialDeEvaluacionesFisicas)
        router.get("/view/tratamientos", ...middlewares,controller.VistaTratamientosPrescritos)
        router.get("/view/tratamientos/prescritos/historial", ...middlewares,controller.VistaHistorialDeTratamientosPrescritos)
        router.get("/view/crear/tratamiento/prescrito", ...middlewares,controller.VistaCrearTratamientoPrescrito)
        router.get("/view/actualizar/tratamiento/prescrito", ...middlewares,controller.VistaActualizarTratamientoPrescrito)
        router.get("/eliminar/tratamiento/prescrito", ...middlewares,controller.eliminarTratamientoPrescrito)
        router.get("/view/sintomas", ...middlewares,controller.VistaSintomas)
        router.get("/view/historial/sintomas", ...middlewares,controller.VistaHistorialSintomas)

        router.post("/crear/tratamiento/prescrito", ...middlewares,controller.crearTratamientoPrescrito)
        router.post("/actualizar/tratamiento/prescrito", ...middlewares,controller.actualizarTratamientoPrescrito)
        router.post("/crear/diagnostico", ...middlewares,controller.crearDiagnostico)
        router.post("/actualizar/diagnostico", ...middlewares,controller.actualizarDiagnostico)
        router.get("/eliminar/diagnostico", ...middlewares,controller.eliminarDiagnostico)
        router.post("/crear/prueba/diagnostica", ...middlewares,controller.crearPruebaDiagnostica)
        router.post("/actualizar/prueba/diagnostica", ...middlewares,controller.actualizarPruebaDiagnostica)
        router.get("/eliminar/prueba/diagnostica", ...middlewares,controller.eliminarPruebaDiagnostica)
        return router;
    }
}