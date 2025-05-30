"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdmisionRoutes = void 0;
const express_1 = require("express");
const AdmisionController_1 = require("./AdmisionController");
//TODO: VER BUG DE QUE NO CARGA LOS DATOS DESPUES DE CREAR UN PACIENTE
class AdmisionRoutes {
    static admisionRoutes(conexionBd) {
        const router = (0, express_1.Router)();
        const controller = new AdmisionController_1.AdmisionController(conexionBd);
        //vistas
        //!: 1- Vista principal de admision
        //router.get("/test", controller.test)
        router.get("/", controller.vistaPrincipal); //*:Comprobado
        router.get("/emergencia", controller.vistaEmergencia); //*:Comprobado
        router.post("/emergencia/habitacion", controller.admitirPacienteDeEmergencia); //*Comprobado
        router.get("/principal/paciente", controller.vistaPrincipalPaciente); //*:Comprobado
        //!: 2- Vista de buscar Paciente
        router.get("/find", controller.vistaBuscarPorDni); //*:Comprobado
        router.get("/find/desconocido", controller.vistaBuscarPacienteDesconocido);
        //!: 3.1 - Vista panel de crear paciente    
        router.get("/crear/paciente", controller.vistaCrearPaciente); //*:Comprobado
        //!: 3.2- Vista panel principal de paciente
        router.get("/find/paciente", controller.buscarPacientePorDni); //*: YA ESTA TRABAJANDO CON LA VISTA DE BUSQUEDA DE DNI
        router.get("/find/paciente/desconocido", controller.buscarPacienteDesconocido);
        //!3.3- Vista de crear seguro medico
        router.get("/crear/seguro/medico", controller.vistaCrearSeguroMedico); //*:Comprobado
        router.get("/actualizar/seguro/medico", controller.vistaActualizarSeguroMedico);
        //?VISTA ADMISION
        router.get("/redireccion/admision", controller.redireccionadorDeVistasDeAdmision);
        router.get("/crear/admision", controller.vistaCrearAdmision);
        router.get("/actualizar/admision", controller.vistaActualizarAdmision);
        //!: 4- Vista de actualizar paciente
        router.get("/actualizar/paciente", controller.vistaActualizarPaciente); //*:Comprobado
        //GETTERS PACIENTES
        router.get("/get/info/paciente/:dni", controller.buscarTodaLaInformacionDelPaciente); //Trae la info del paciente incluyendo el seguro medico //todo:Comprobado
        //POST PACIENTES
        router.post("/register/paciente", controller.registrarPaciente); //*:Comprobado
        router.post("/update/paciente", controller.actualizarPaciente); //*:Comprobado PUT
        //SEGUROS MEDICOS
        router.get("/redirect/seguro", controller.redireccionarAVistaDeSeguros);
        router.get("/get/seguro/medico/:numero", controller.getSeguroMedico); //obtener seguro medico por numero //todo:Deberia funcionar, no testeado
        router.post("/actualizar/seguro/medico", controller.actualizarSeguroMedico); //actualizar Paciente//!Comprobar
        router.post("/registrar/seguro/medico", controller.registrarYAsignarSeguroMedico); //Crea el seguro medico y lo asigna al paciente //!Comprobar: Creo que no va a ser utilizado
        //ADMISION
        router.get("/get/todas/las/admisiones", controller.getTodasLasAdmisiones); //todo:Deberia funcionar, no testeado
        router.get("/get/admision/de/paciente/:dni", controller.buscarAdmisionPorPaciente); //todo:Deberia funcionar, no testeado
        router.get("/get/habitacion", controller.getHabitacionesDisponiblesPorGenero);
        router.get("/get/habitacion/ocupada", controller.getHabitacionByCamaId);
        router.post("/create/admision", controller.crearAdmision); //todo: FALTA TESTEAR
        router.post("/update/admision", controller.updateAdmision);
        router.post("/baja", controller.bajaLogicaAdmision); //*Testeado
        router.post("/alta", controller.altaLogicaAdmision); //*Testeado 
        //TURNOS
        //router.post("/crear/turno")
        //router.get("/get/turno")
        // router.put("/actualizar/turno")
        // router.delete("/delete/turno")
        return router;
    }
}
exports.AdmisionRoutes = AdmisionRoutes;
