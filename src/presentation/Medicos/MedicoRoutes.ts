import { Router } from "express";
import { MedicoController } from "./MedicoController";
import { MiddlewareFor } from "../../middlewares/MiddlewareFor";

export class MedicoRoutes{

    static routes():Router{

        const router = Router();
        const controller = new MedicoController();
        router.use(MiddlewareFor.AuthSession("Medico"))
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
        router.get("/view/tratamientos/diagnostico", ...middlewares,controller.VistaTratamientosParaDiagnostico)
        router.get("/view/tratamientos/diagnostico/registrar", ...middlewares,controller.VistaCrearTratamientoParaDiagnostico)
        router.get("/view/tratamientos/diagnostico/actualizar", ...middlewares,controller.VistaActualizarTratamientoParaDiagnostico)
        
        router.get("/view/historial", ...middlewares, MiddlewareFor.verificarPacienteNoDesconocido("/medicos/view/paciente/seleccionado","warning","Un paciente desconocido no tiene historial"),controller.VistaHistorialMedico)
        router.get("/view/historial/alergias", ...middlewares, MiddlewareFor.verificarPacienteNoDesconocido("/medicos/view/paciente/seleccionado","warning","Un paciente desconocido no tiene historial"),controller.VistaHistorialDeAlergias)
        router.get("/view/historial/medicamentos/actuales", ...middlewares, MiddlewareFor.verificarPacienteNoDesconocido("/medicos/view/paciente/seleccionado","warning","Un paciente desconocido no tiene historial"),controller.VistaHistorialDeMedicamentosActuales)
        router.get("/view/historial/antecedentes/familiares", ...middlewares, MiddlewareFor.verificarPacienteNoDesconocido("/medicos/view/paciente/seleccionado","warning","Un paciente desconocido no tiene historial"),controller.VistaHistorialDeAntecedentesFamiliares)
        router.get("/view/historial/cirugias", ...middlewares, MiddlewareFor.verificarPacienteNoDesconocido("/medicos/view/paciente/seleccionado","warning","Un paciente desconocido no tiene historial"),controller.VistaHistorialDeCirugias)
        router.get("/view/evaluacion/fisica", ...middlewares,controller.VistaEvaluacionesFisicasActual)
        router.get("/view/historial/evaluacion/fisica", ...middlewares, MiddlewareFor.verificarPacienteNoDesconocido("/medicos/view/evaluacion/fisica","warning","Un paciente desconocido no tiene historial"),controller.VistaHistorialDeEvaluacionesFisicas)
        router.get("/view/tratamientos", ...middlewares,controller.VistaTratamientosPrescritos)
        router.get("/view/tratamientos/prescritos/historial", ...middlewares, MiddlewareFor.verificarPacienteNoDesconocido("/medicos/view/tratamientos","warning","Un paciente desconocido no tiene historial"),controller.VistaHistorialDeTratamientosPrescritos)
        router.get("/view/crear/tratamiento/prescrito", ...middlewares,controller.VistaCrearTratamientoPrescrito)
        router.get("/view/actualizar/tratamiento/prescrito", ...middlewares,controller.VistaActualizarTratamientoPrescrito)
        router.get("/eliminar/tratamiento/prescrito", ...middlewares,controller.eliminarTratamientoPrescrito)
        router.get("/view/sintomas", ...middlewares,controller.VistaSintomas)
        router.get("/view/historial/sintomas", ...middlewares, MiddlewareFor.verificarPacienteNoDesconocido("/medicos/view/sintomas","warning","Un paciente desconocido no tiene historial"),controller.VistaHistorialSintomas)
        router.get("/view/seccion/alta/paciente", ...middlewares,controller.VistaSeccionAltaPaciente)
        router.get("/view/lista/recetas/medicas", ...middlewares,controller.VistaListaRecetasMedicas)
        router.get("/view/alta/historial/recetas", ...middlewares, MiddlewareFor.verificarPacienteNoDesconocido("/medicos/view/lista/recetas/medicas","warning","Un paciente desconocido no tiene historial"),controller.VistaHistorialRecetasMedicas)
        router.get("/view/alta/receta/medicamentos", ...middlewares,controller.VistaListaMedicamentosReceta)
        router.get("/view/alta/receta/medicamentos/historial", ...middlewares, MiddlewareFor.verificarPacienteNoDesconocido("/medicos/view/alta/receta/medicamentos","warning","Un paciente desconocido no tiene historial"),controller.VistaHistorialMedicamentosReceta)
        router.get("/view/alta/receta/medicamentos/crear", ...middlewares,controller.VistaRegistrarMedicamentoEnReceta)
        router.get("/view/alta/receta/medicamentos/actualizar", ...middlewares,controller.VistaActualizarMedicamentoEnReceta)
        router.get("/view/alta/recomendacion/seguimiento", ...middlewares,controller.VistaRecomendacionDeSeguimiento)
        router.get("/view/seccion/final/altas", ...middlewares,controller.VistaSeccionDarAltas)
        router.get("/view/historial/altas", ...middlewares, MiddlewareFor.verificarPacienteNoDesconocido("/medicos/view/seccion/final/altas","warning","Un paciente desconocido no tiene historial"),controller.VistaHistorialAltas)
        router.get("/view/alta/final", ...middlewares,controller.VistaDarAlta)
        router.get("/view/alta/final/datos", ...middlewares,controller.VistaDarAltaFinal)
        router.get("/imprimir/alta", ...middlewares,controller.imprimirAlta)
        
        router.post("/crear/tratamiento/prescrito", ...middlewares,controller.crearTratamientoPrescrito)
        router.post("/actualizar/tratamiento/prescrito", ...middlewares,controller.actualizarTratamientoPrescrito)
        router.post("/crear/diagnostico", ...middlewares,controller.crearDiagnostico)
        router.post("/actualizar/diagnostico", ...middlewares,controller.actualizarDiagnostico)
        router.get("/eliminar/diagnostico", ...middlewares,controller.eliminarDiagnostico)
        router.post("/crear/prueba/diagnostica", ...middlewares,controller.crearPruebaDiagnostica)
        router.post("/actualizar/prueba/diagnostica", ...middlewares,controller.actualizarPruebaDiagnostica)
        router.get("/eliminar/prueba/diagnostica", ...middlewares,controller.eliminarPruebaDiagnostica)
        router.post("/crear/tratamiento/diagnostico", ...middlewares,controller.CrearTratamientoParaDiagnostico)
        router.post("/actualizar/tratamiento/diagnostico", ...middlewares,controller.ActualizarTratamientoParaDiagnostico)
        router.get("/eliminar/tratamiento/diagnostico", ...middlewares,controller.EliminarTratamientoParaDiagnostico)
        router.post("/registrar/medicamento/en/receta", ...middlewares,controller.crearMedicamentoDeReceta)
        router.post("/actualizar/medicamento/en/receta", ...middlewares,controller.actualizarMedicamentoDeReceta)
        router.get("/eliminar/medicamento/en/receta", ...middlewares,controller.eliminarMedicamentoDeReceta)
        router.get("/crear/receta", ...middlewares,controller.crearReceta)
        router.get("/eliminar/receta", ...middlewares,controller.eliminarReceta)
        router.post("/actualizar/recomendacion/seguimiento", ...middlewares,controller.actualizarRecomendacionDeSeguimiento)
        router.post("/dar/alta", ...middlewares,controller.darAlta)

        return router;
    }
}