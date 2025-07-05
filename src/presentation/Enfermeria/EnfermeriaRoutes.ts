import { Router } from "express";
import { EnfermerosController } from "./EnfermerosController";
import { Conexion } from "../../data/conexion";
import { MiddlewareFor } from "../../middlewares/MiddlewareFor";



export class EnfermeriaRoutes{


    static  enfermeriaRoutes(conexionBd:Conexion):Router{

        const router = Router();
        const controller = new EnfermerosController();
        router.use(MiddlewareFor.InicializarSessionEnfermero)

        const middlewareEnfermero = [
            MiddlewareFor.verificarSessionPaciente("/enfermeria/","warning","Se ha cerrado la sesion del paciente"),
            MiddlewareFor.verificarPacienteNoDesconocido("/enfermeria/view/paciente","warning","No se puede actualizar la informacion de un paciente desconocido"),
            MiddlewareFor.verificarSessionAdmision("/enfermeria/","warning","Debe Seleccionar una admision"),
        ]



        router.get("/test", controller.test)

        router.get("/", controller.vistaPrincipal);
        router.get("/view/paciente",controller.vistaPacienteSeleccionado);
        router.get("/view/actualizar/paciente",...middlewareEnfermero, controller.vistaActualizarInformacionPaciente);
        router.get("/view/historial/paciente", ...middlewareEnfermero,controller.vistaHistorialMedico);
        router.get("/view/alergias/paciente", ...middlewareEnfermero,controller.vistaListaAlergias);
        router.get("/view/crear/alergia", ...middlewareEnfermero,controller.vistaCrearAlergia);
        router.get("/view/actualizar/alergia", ...middlewareEnfermero,controller.vistaActualizarAlergia);
        router.get("/view/crear/tratamiento/alergia", ...middlewareEnfermero,controller.vistaCrearTratamientoAlergia);
        router.get("/view/actualizar/tratamiento/alergia", ...middlewareEnfermero,controller.vistaActualizarTratamientoAlergia);
        router.get("/view/medicacion/actual", ...middlewareEnfermero,controller.vistaListaMedicacionActual);
        router.get("/view/crear/medicacion/actual", ...middlewareEnfermero,controller.vistaCrearMedicacionActual);
        router.get("/view/editar/medicacion/actual", ...middlewareEnfermero,controller.vistaEditarMedicacionActual);
        router.get("/view/antecedentes/familiares", ...middlewareEnfermero,controller.vistaAntecedentesFamiliares);
        router.get("/view/crear/antecedentes/familiares", ...middlewareEnfermero,controller.vistaCrearAntecedentesFamiliares);
        router.get("/view/actualizar/antecedentes/familiares", ...middlewareEnfermero,controller.vistaActualizarAntecedentesFamiliares)
        router.get("/eliminar/antecedentes/familiares", ...middlewareEnfermero, controller.eliminarAntecedentesFamiliares)
        router.get("/view/cirugias", ...middlewareEnfermero, controller.vistaListaCirugias)
        router.get("/view/crear/cirugia", ...middlewareEnfermero, controller.vistaCrearCirugia)
        router.get("/view/actualizar/cirugia", ...middlewareEnfermero, controller.vistaActualizarCirugia)
        router.get("/eliminar/cirugia", ...middlewareEnfermero, controller.eliminarCirugia)
        router.get("/view/diagnosticos", ...middlewareEnfermero, controller.vistaDiagnosticos)
        router.get("/view/evaluaciones/fisicas", middlewareEnfermero[0],middlewareEnfermero[2], controller.vistaListaEvaluacionFisica)
        router.get("/view/lista/all/evaluacion/fisica", ...middlewareEnfermero, controller.vistaListaAllEvaluacionFisica)
        router.get("/view/crear/evaluacion/fisica", middlewareEnfermero[0],middlewareEnfermero[2], controller.vistaCrearEvaluacionFisica)
        router.get("/view/actualizar/evaluacion/fisica", middlewareEnfermero[0],middlewareEnfermero[2], controller.vistaActualizarEvaluacionFisica)
        router.get("/eliminar/evaluacion/fisica", middlewareEnfermero[0],middlewareEnfermero[2], controller.eliminarEvaluacionFisica)
        router.get("/view/internacion", ...middlewareEnfermero, controller.vistaInternacion)
        router.get("/view/sintomas/paciente", ...middlewareEnfermero, controller.vistaListaSintomas)
        router.get("/view/historial/sintomas/paciente", ...middlewareEnfermero, controller.vistaAllSintomas)
        router.get("/view/crear/sintoma", ...middlewareEnfermero, controller.vistaCrearSintoma)


        router.post("/actualizar/paciente",...middlewareEnfermero,controller.actualizarInformacionPaciente)
        router.post("/crearAlergia", ...middlewareEnfermero,controller.crearAlergia)
        router.post("/actualizarAlergia", ...middlewareEnfermero,controller.actualizarAlergia);
        router.get("/eliminarAlergia", ...middlewareEnfermero,controller.eliminarAlergia)
        router.post("/crear/Tratamiento/Para/Alergia", ...middlewareEnfermero,controller.crearTratamientoAlergia);
        router.post("/actualizar/Tratamiento/Para/Alergia", ...middlewareEnfermero,controller.actualizarTratamientoAlergia);
        router.get("/eliminar/tratamiento/alergia", ...middlewareEnfermero,controller.eliminarTratamientoAlergia);
        router.post("/crear/medicacion/actual", ...middlewareEnfermero,controller.crearMedicacionActual);
        router.post("/actualizar/medicacion/actual", ...middlewareEnfermero,controller.actualizarMedicacionActual);
        router.get("/eliminar/medicacion/actual", ...middlewareEnfermero,controller.eliminarMedicacionActual);
        router.post("/crear/antecedentes/familiares", ...middlewareEnfermero,controller.crearAntecedentesFamiliares);
        router.post("/actualizar/antecedentes/familiares", ...middlewareEnfermero,controller.actualizarAntecedentesFamiliares);
        router.post("/crear/cirugia", ...middlewareEnfermero,controller.crearCirugia)
        router.post("/actualizar/cirugia", ...middlewareEnfermero,controller.actualizarCirugia)
        router.post("/crear/evaluacion/fisica", middlewareEnfermero[0],middlewareEnfermero[2],controller.crearEvaluacionFisica)
        router.post("/actualizar/evaluacion/fisica", middlewareEnfermero[0],middlewareEnfermero[2],controller.actualizarEvaluacionFisica)
        router.post("/crear/sintoma", ...middlewareEnfermero,controller.crearSintoma)
        return router
    }

}