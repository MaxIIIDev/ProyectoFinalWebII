import { Router } from "express";
import { AdmisionController } from "./AdmisionController";
import { Conexion } from "../../data/conexion";

//TODO: VER BUG DE QUE NO CARGA LOS DATOS DESPUES DE CREAR UN PACIENTE


export class AdmisionRoutes{

    static admisionRoutes(conexionBd: Conexion): Router{

        
        const router = Router();
        const controller = new AdmisionController(conexionBd);
        
        //vistas
        //!: 1- Vista principal de admision
        router.get("/test", controller.test)
        router.get("/", controller.vistaPrincipal)//*:Comprobado
        router.get("/emergencia", controller.vistaEmergencia)//*:Comprobado
        router.post("/emergencia/habitacion", controller.admitirPacienteDeEmergencia)//*Comprobado
        router.get("/principal/paciente", controller.vistaPrincipalPaciente) //*:Comprobado
        router.get("/camas", controller.vistaCamas)
        //!: 2- Vista de buscar Paciente
        router.get("/find" , controller.vistaBuscarPorDni) //*:Comprobado
        router.get("/find/desconocido", controller.vistaBuscarPacienteDesconocido)
        //!: 3.1 - Vista panel de crear paciente    
         router.get("/crear/paciente", controller.vistaCrearPaciente) //*:Comprobado
         //!: 3.2- Vista panel principal de paciente
        router.get("/find/paciente", controller.buscarPacientePorDni); //*: YA ESTA TRABAJANDO CON LA VISTA DE BUSQUEDA DE DNI
        router.get("/find/paciente/desconocido", controller.buscarPacienteDesconocido)
        //!3.3- Vista de crear seguro medico
        router.get("/crear/seguro/medico", controller.vistaCrearSeguroMedico) //*:Comprobado
        router.get("/actualizar/seguro/medico", controller.vistaActualizarSeguroMedico)
        //?VISTA ADMISION
        router.get("/redireccion/admision", controller.redireccionadorDeVistasDeAdmision)
        router.get("/crear/admision", controller.vistaCrearAdmision)
        router.get("/actualizar/admision", controller.vistaActualizarAdmision);
        //!: 4- Vista de actualizar paciente
        
        router.get("/actualizar/paciente", controller.vistaActualizarPaciente) //*:Comprobado

        //GETTERS PACIENTES
        
        router.get("/get/info/paciente/:dni", controller.buscarTodaLaInformacionDelPaciente) //Trae la info del paciente incluyendo el seguro medico //todo:Comprobado

        //POST PACIENTES
        router.post("/register/paciente", controller.registrarPaciente);//*:Comprobado
        router.post("/update/paciente", controller.actualizarPaciente)//*:Comprobado PUT
        
        //SEGUROS MEDICOS
        router.get("/redirect/seguro", controller.redireccionarAVistaDeSeguros)
        router.get("/get/seguro/medico/:numero", controller.getSeguroMedico); //obtener seguro medico por numero //todo:Deberia funcionar, no testeado
        router.post("/actualizar/seguro/medico", controller.actualizarSeguroMedico)//actualizar Paciente//!Comprobar
        router.post("/registrar/seguro/medico", controller.registrarYAsignarSeguroMedico)//Crea el seguro medico y lo asigna al paciente //!Comprobar: Creo que no va a ser utilizado
       
        //ADMISION
        router.get("/get/todas/las/admisiones", controller.getTodasLasAdmisiones)//todo:Deberia funcionar, no testeado
        router.get("/get/admision/de/paciente/:dni",controller.buscarAdmisionPorPaciente)//todo:Deberia funcionar, no testeado
        router.get("/get/habitacion", controller.getHabitacionesDisponiblesPorGenero)
        //HABITACIONES
        router.get("/get/habitacion/by/ala", controller.getHabitacionesByAla) //*Testeado,QueryParams
        router.get("/get/habitacion/ocupada", controller.getHabitacionByCamaId) 
        
        router.post("/create/admision", controller.crearAdmision)//*Testeado
        router.post("/update/admision", controller.updateAdmision);//*Testeado
        router.post("/baja", controller.bajaLogicaAdmision)//*Testeado
        router.post("/alta", controller.altaLogicaAdmision)//*Testeado 

        //TURNOS
        //!EN DESARROLLO
        router.get("/get/all/turnos", controller.getAllTurnosInDay) //todo:Deberia funcionar, no testeado
        router.get("/get/turno/for/patient", controller.getTurnosByPaciente) //todo:Deberia funcionar, no testeado
        router.post("/crear/turno", controller.crearTurno)//todo:Deberia funcionar, no testeado
        router.post("/actualizar/turno", controller.actualizarTurno)//todo:Deberia funcionar, no testeado
        router.delete("/delete/turno", controller.eliminarTurno)//todo:Deberia funcionar, no testeado
        return router
    }


}