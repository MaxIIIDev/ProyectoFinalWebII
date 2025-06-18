import { Request, response, Response, urlencoded } from "express";
import { Conexion } from "../../data/conexion";
import { CreatePacienteDto } from "../../domain/Dtos/pacientes/createPacienteDto";
import { PacienteServices } from "../services/PacientesService";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";
import { UpdatePacienteDto } from "../../domain/Dtos/pacientes/updatePacienteDto";
import { CreateSeguroMedicoDto } from "../../domain/Dtos/SeguroMedico/createSeguroMedicoDto";
import { SeguroMedicoService } from "../services/SeguroMedicoService";
import { UpdateSeguroMedicoDto } from "../../domain/Dtos/SeguroMedico/updateSeguroMedicoDto";
import { AlaService } from "../services/Hospital/AlaService";
import { HabitacionService } from "../services/Hospital/HabitacionService";
import { GetPacienteDto } from "../../domain/Dtos/pacientes/getPacienteDto";
import { getSeguroMedicoDTO } from "../../domain/Dtos/SeguroMedico/getSeguroMedico";
import { AdmisionService } from "../services/AdmisionService";
import { GetAdmisionPorPacienteDTO } from "../../domain/Dtos/admision/GetAdmisionPorPacienteDTO";
import { CrearAdmisionDto } from "../../domain/Dtos/admision/CrearAdmisionDTO";
import { PacienteAnonimo } from "../../Helpers/PacienteAnonimo";
import { CreatePacienteNNDto } from "../../domain/Dtos/pacientes/createPacienteNNDto";
import { MotivosDeInternacionService } from "../services/MotivosDeInternacionService";
import { CamaService } from "../services/Hospital/CamaService";
import { PrioridadDeAtencionService } from "../services/PrioridadDeAtencionService";
import { ActualizarAdmisionDto } from "../../domain/Dtos/admision/ActualizarAdmisionDTO";
import { TurnosService } from "../services/TurnosService";
import { CrearTurnoDto } from "../../domain/Dtos/Turnos/createTurnoDTO";
import { updateTurnoDto } from "../../domain/Dtos/Turnos/updateTurnoDto";
import { HorariosTurnosServices } from "../services/HorariosTurnosServices";




export class AdmisionController{
   

    private conexionBd: Conexion;
    public constructor(conexionbd: Conexion){
        this.conexionBd = conexionbd;
    }
    ////////////////////////////////////////////////////
    ////////////////////!VISTAS////////////////////////
    ////////////////////////////////////////////////////
    public vistaPrincipal = async(req: Request, res:Response)=> {
        const error = req.query.error as string || undefined;
        try {
            if(error){
                res.render("AdmisionViews/principal.pug",{
                    error: `${error}`
                })
                return
            }

            res.render("AdmisionViews/principal.pug");

        } catch (error) {
            res.render("AdmisionViews/principal.pug",{
                error: `${error}`,
                
            });
            return
        }
    }
    public vistaEmergencia = async(req:Request, res:Response)=> {
        const error = req.query.error as string | undefined;
        try {
            const alas = await AlaService.getAlaFromDb()
            const motivosDeInternacion = await MotivosDeInternacionService.buscarMotivosDeInternacion();
            if(error){
                res.render("AdmisionViews/emergencia.pug", {
                    error: `${error}`,
                    alas: alas,
                    motivoDeInternacion:motivosDeInternacion[1] 
                })
                return
            }
            
            res.render("AdmisionViews/emergencia.pug", {
                //error: "errorPersonalizado",
                //success: "funciono bien",
                //info: "habia un caracol rojo",
                //warning: "fijate bien loco",
                alas: alas,
                motivoDeInternacion:motivosDeInternacion[1] 
            }) 
        } catch (error) {
            res.render("AdmisionViews/principal.pug",{
                error: `${error}`,
                
            })
        }
        
        
    }
    public vistaBuscarPorDni = async ( req:Request, res:Response)=> {
        try {
            res.render("AdmisionViews/buscarPaciente.pug")
            return
        } catch (error) {
            res.render("AdmisionViews/principal.pug",{
                error: `${error}`,
            })
            return
        }
    }
    public vistaBuscarPacienteDesconocido = async (req:Request, res:Response)=> {
        const warning = req.query.warning as string || undefined;
        try {
            if(warning){
                res.render("AdmisionViews/buscarPacienteDesconocido.pug",{
                    warning: warning
                })
                return
            }
            res.render("AdmisionViews/buscarPacienteDesconocido.pug")
            return
        } catch (error) {
            res.render("AdmisionViews/buscarPacienteDesconocido.pug", {
                error: error as string
            })
            return
        }
    }

    public vistaCrearPaciente = async ( req:Request, res:Response)=>{
        try {
            res.render("AdmisionViews/CrearPaciente.pug", {
            warning: "El paciente no se encontró registrado. Va a proceder a crear una cuenta"
            })
            return
        } catch (error) {
            res.render("AdmisionViews/principal.pug",{
                error: `${error}`,
            })
            return
        }
    }
    public vistaPrincipalPaciente = async( req:Request, res:Response)=> {//todo: Posiblemente no se use
        const error = req.query.error as string | undefined;
        const confirmacion = req.query.confirmacion as string | undefined;
        try {
            const paciente = req.session.paciente;
            if(!paciente){
                res.render("AdmisionViews/buscarPaciente.pug", {
                    warning: "Se cerró la sesión del paciente"})
                return
            }
            if(error){
                    res.render("AdmisionViews/vistaPaciente.pug", {
                        paciente:paciente,
                        error: `${error}`}
                    )
                return
            }
            if(confirmacion){
                res.render("AdmisionViews/vistaPaciente.pug", {
                    paciente:paciente,    
                    success: `${confirmacion}`}
                    )
                return
            }
            res.render("AdmisionViews/vistaPaciente.pug" , {paciente: paciente})
        } catch (error) {
            res.render("AdmisionViews/principal.pug",{
                error: `${error}`,
                
            })
            return
        }
        

    }
    public redireccionarAVistaDeSeguros = async(req:Request, res:Response) =>{

        try {
            if(!req.session.paciente){
                res.render("AdmisionViews/principal.pug",{
                    warning: "Se ha cerrado la session"
                })
                return
            }
            
            const validado = await PacienteServices.saberSiElPacienteTieneSeguroMedico(req.session.paciente?.dni!);
            if(!validado[1]){
                res.redirect("/admision/crear/seguro/medico")
                return
            }
            res.redirect("/admision/actualizar/seguro/medico")
            return
        } catch (error) {
            res.render("AdmisionViews/vistaPaciente.pug",{
                paciente: req.session.paciente,
                error: `${error}`
            })
            return
        }

    }

    public vistaActualizarPaciente = async(req:Request, res:Response) => {
        try {
            if(!req.session.paciente){
                res.render("AdmisionViews/principal.pug",{
                    warning:"Se cerró la sesión del paciente"
                    })
                return
            }
            console.log("VISTA ACTUALIZAR PACIENTE");
            
            console.log(req.session.paciente);
            
            res.render("AdmisionViews/ActualizarPaciente.pug", {paciente: req.session.paciente})
            return
        } catch (error) {
            res.render("AdmisionViews/principal.pug",{
                error: `${error}`
            })
            return
        }
        
    }
    public vistaCrearSeguroMedico = async(req:Request, res:Response) => {
        try{
            const mutuales = await SeguroMedicoService.getMutualesFromDb();
            const categorias = await SeguroMedicoService.getCategoriasFromDb();
            if(!req.session.paciente){
                res.render("AdmisionViews/principal.pug",{
                    warning:"Se cerró la sesión del paciente"
                })
                return
            }
            
            
            res.render("AdmisionViews/crearSeguroMedico.pug", {
                paciente: req.session.paciente,
                mutuales: mutuales[1],
                categorias: categorias[1]
            })
            return
        }catch(error){
            res.render("AdmisionViews/principal.pug",{
                error: `${error}`
            })
            return
        }
        

    }
    public vistaActualizarSeguroMedico = async(req:Request, res:Response) =>{
        const error = req.query.error as string | undefined;
        const confirmacion = req.query.confirmacion as string | undefined;
        try {
            if(!req.session.paciente){
                res.render("AdmisionViews/principal.pug",{
                    warning: "Se cerro la sesion"
                })
                return
            }
            const mutuales = await SeguroMedicoService.getMutualesFromDb();
            const categorias = await SeguroMedicoService.getCategoriasFromDb();
            const seguroMedico = await SeguroMedicoService.buscarSeguroMedico(req.session.paciente?.id_seguro_medico!)
            
            console.log(seguroMedico[1].dataValues.categoria_seguro.dataValues);
            if(error){
                res.render("AdmisionViews/actualizarSeguroMedico", {
                paciente: req.session.paciente,
                mutuales: mutuales[1],
                categorias: categorias[1],
                seguroMedico: seguroMedico[1].dataValues,
                error:`${error}`
                })
                return
            }
            if(confirmacion){
                res.render("AdmisionViews/actualizarSeguroMedico", {
                paciente: req.session.paciente,
                mutuales: mutuales[1],
                categorias: categorias[1],
                seguroMedico: seguroMedico[1].dataValues,
                success:`${confirmacion}`
                })
                return
            }
            
            res.render("AdmisionViews/actualizarSeguroMedico", {
                paciente: req.session.paciente,
                mutuales: mutuales[1],
                categorias: categorias[1],
                seguroMedico: seguroMedico[1].dataValues
            })
            return
        } catch (error) {
            res.render("AdmisionViews/principal.pug",{
                error: `${error}`
            })
            return
        }

    }
    public redireccionadorDeVistasDeAdmision = async(req:Request, res: Response) => {
        try {
            if(!req.session.paciente){
                res.redirect(`/admision/?error=${encodeURI("Se cerro la sesion del paciente")}`)
            }
            const admisionEncontrada = await AdmisionService.buscarAdmisionVigentePorPaciente(req.session.paciente?.id_Paciente!)
            if(!admisionEncontrada[1]){
                res.redirect(`/admision/crear/admision`)
            }
            
            req.session.admision = admisionEncontrada[1]?.dataValues!
            const alaOcupada = await CamaService.buscarCama(req.session.admision!.id_Cama);
            req.session.restosAdmision= alaOcupada[1]?.dataValues.habitacion.dataValues.ala.dataValues.nombre;

            
            
            res.redirect("/admision/actualizar/admision")
        } catch (error) {
            res.redirect(`/admision/?error=${encodeURI(error as string)}`)
            return
        }
     }

    public vistaCrearAdmision = async(req:Request,res:Response)=> {
        const error = req.query.error as string | undefined;
        const confirmacion = req.query.confirmacion as string | undefined
        try {
            const motivosDeInternacion = await MotivosDeInternacionService.buscarMotivosDeInternacion();
            const prioridadesDeAtencion = await PrioridadDeAtencionService.buscarLasPrioridadesDeAtencionEnDB();
            const tiposDeAdmision = await AdmisionService.getTiposDeAdmision();
            const alas = await AlaService.getAlaFromDb();

            if(!req.session.paciente){
                res.redirect(`/admision/?error=${encodeURIComponent("Se cerró la sesion del paciente")}`)
                return
            }
            if(error){
                res.render("AdmisionViews/vistaCrearAdmision.pug", {
                motivosDeInternacion: motivosDeInternacion[1],
                prioridadesDeAtencion: prioridadesDeAtencion[1],
                tiposDeAdmision: tiposDeAdmision[1],
                alas: alas,
                paciente: req.session.paciente,
                error: `${error}`
                })
                return
            }
            if(confirmacion){
                res.render("AdmisionViews/vistaCrearAdmision.pug", {
                motivosDeInternacion: motivosDeInternacion[1],
                prioridadesDeAtencion: prioridadesDeAtencion[1],
                tiposDeAdmision: tiposDeAdmision[1],
                alas: alas,
                paciente: req.session.paciente,
                success: `${confirmacion}`
                })
                return
            }

            res.render("AdmisionViews/vistaCrearAdmision.pug", {
                motivosDeInternacion: motivosDeInternacion[1],
                prioridadesDeAtencion: prioridadesDeAtencion[1],
                tiposDeAdmision: tiposDeAdmision[1],
                alas: alas,
                paciente: req.session.paciente
            })
            return
        } catch (error) {
            res.redirect(`/admision/?error=${encodeURIComponent("Se cerró la sesion del paciente")}`)
            return
        }


    }
    public vistaActualizarAdmision = async(req:Request, res:Response) => {
        const error = req.query.error as string || undefined;
        const confirmacion = req.query.confirmacion as string || undefined;
        try {
            if(!req.session.paciente){
                res.redirect(`/admision/?error=${encodeURI("Se ha cerrado la sesion del paciente")}`)
            }
            if(!req.session.admision){
                res.redirect(`/admision/principal/paciente?error=${encodeURI("Error en el redireccionamiento de admision")}`)
            }
             const motivosDeInternacion = await MotivosDeInternacionService.buscarMotivosDeInternacion();
            const prioridadesDeAtencion = await PrioridadDeAtencionService.buscarLasPrioridadesDeAtencionEnDB();
            const tiposDeAdmision = await AdmisionService.getTiposDeAdmision();
            const alas = await AlaService.getAlaFromDb();
            console.log("PROBANDOO: " + req.session.restosAdmision);
            
            if(error){
                res.render("AdmisionViews/vistaActualizarAdmision.pug", {
                error: error,
                motivosDeInternacion: motivosDeInternacion[1],
                prioridadesDeAtencion: prioridadesDeAtencion[1],
                tiposDeAdmision: tiposDeAdmision[1],
                alas: alas,
                paciente: req.session.paciente,
                admision: req.session.admision,
                restosAdmision: req.session.restosAdmision
                })
            return
            } 
            if(confirmacion){
                res.render("AdmisionViews/vistaActualizarAdmision.pug", {
                motivosDeInternacion: motivosDeInternacion[1],
                prioridadesDeAtencion: prioridadesDeAtencion[1],
                tiposDeAdmision: tiposDeAdmision[1],
                alas: alas,
                paciente: req.session.paciente,
                success: confirmacion,
                admision: req.session.admision,
                restosAdmision: req.session.restosAdmision
                })
            return
            }
            res.render("AdmisionViews/vistaActualizarAdmision.pug", {
                motivosDeInternacion: motivosDeInternacion[1],
                prioridadesDeAtencion: prioridadesDeAtencion[1],
                tiposDeAdmision: tiposDeAdmision[1],
                alas: alas,
                paciente: req.session.paciente,
                admision: req.session.admision,
                restosAdmision: req.session.restosAdmision
            })
            
        } catch (error) {
            res.redirect(`/admision/?error=${encodeURI(error as string)}`)
        }

    }
    public vistaCamas = async(req:Request, res:Response) => {
        try {
            const alas = await AlaService.getAlaFromDb();
            res.render("AdmisionViews/listarTodasLasCamas.pug",{
                alas: alas
            })
        } catch (error) {
            res.redirect(`/admision/?error=${encodeURI(error as string)}`)
        }
    }
    
    ////////////////////////////////////////////////////
    ////////////////////!PACIENTES//////////////////////
    ////////////////////////////////////////////////////
    public registrarPaciente = async(req:Request,res:Response) =>  {
        try {
            const [ error, createPacienteDto ] = CreatePacienteDto.create(req.body);
            if(error){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearPaciente","AdmisionController" ,"Line 24", error);
                
                throw new Error();
            }           

            const [ errorCrearPaciente, pacienteCreado ] = await PacienteServices.crearPaciente(createPacienteDto!);
            if(errorCrearPaciente){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearPaciente","AdmisionController", "Line 31", errorCrearPaciente)      
                throw new Error(errorCrearPaciente);
                
            }
            if(!pacienteCreado){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("registrarPaciente","AdmisionController","34","La bd no pudo crear el paciente")
                
                res.render("AdmisionViews/principal.pug",{
                    error: "El paciente no se ha creado"})
                return
            }
            const fechaNueva = new Date(pacienteCreado?.dataValues.fecha_nac)
            pacienteCreado!.dataValues.fecha_nac = fechaNueva.toISOString().split("T")[0]; 
            req.session.paciente = pacienteCreado?.dataValues;
            console.log("METODO REGISTRAR PACIENTE");
            
            console.log(req.session.paciente);
            
            res.redirect("/admision/principal/paciente")
            return

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearPaciente","AdmisionController", "Line 30",error as string);
            res.render("AdmisionViews/CrearPaciente.pug",{
                error: `${error}`,
                warning: "El paciente no se encontró registrado. Va a proceder a crear una cuenta"
            })
            return
        }

    }
    public buscarPacientePorDni = async(req:Request,res:Response)=> {

        try {
            const dniRecibido = req.query.dni ;
            if(!dniRecibido){
               
                res.status(500).render("AdmisionViews/buscarPaciente.pug", {
                     error:"Se requiere el dni"
                })
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarPacientePorDni","AdmisionController","217","Se requiere el dni");
                return
            }
            const dni = dniRecibido ? parseInt(dniRecibido as string) : NaN;
            const [errorDto, getPacienteDto] = GetPacienteDto.create(dni);
            if(errorDto){
                res.status(500).render("AdmisionViews/buscarPaciente.pug", {
                     error:`${errorDto}`
                })
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarPacientePorDni","AdmisionController","208",errorDto);
                return
            }
            const [errorBusqueda, pacienteEncontrado] = await PacienteServices.buscarPacienteExistente(getPacienteDto!.dni,1)
            if(!errorBusqueda){
                
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarPacientePorDni","AdmisionController","208","ERROR: No se encontro el paciente")
                
                res.redirect("/admision/crear/paciente")
                return
            }
            req.session.paciente = pacienteEncontrado?.dataValues;
            
            res.redirect("/admision/principal/paciente")
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarPacientePorDni","AdmisionController","208",error as string)
            res.status(500).json(error as string)
            res.status(500).render("AdmisionViews/buscarPaciente.pug",{
                error: `${error}`
            })
            return
        }
    }
    public buscarPacienteDesconocido =  async(req:Request,res:Response) =>{
        try {
            console.log(req.query.id_Paciente);
            const idEnviado = req.query.id_Paciente
            if(!idEnviado){
                res.redirect(`/admision/find/desconocido?error=${encodeURIComponent("Se requiere el id_Paciente")}`)
                return
            }
            const id_Paciente = (idEnviado)?parseInt(idEnviado as string):NaN
            const [errorMetodo, pacienteEncontrado] = await PacienteServices.buscarPacienteDesconocido(id_Paciente);
            if(!errorMetodo){
                res.redirect(`/admision/find/desconocido?warning=${encodeURIComponent("No se encontro al paciente desconocido")}`)
                return
            }
            req.session.paciente = pacienteEncontrado?.dataValues
            res.redirect("/admision/principal/paciente")
            return
        } catch (error) {
            res.redirect(`/admision/find/desconocido?error=${encodeURIComponent(error as string)}`)
            return
        }
    }
    public buscarTodaLaInformacionDelPaciente = async(req:Request,res:Response) => {

        try {
            const dniRecibido = req.params.dni ;
            const [errorDto, getPacienteDto] = GetPacienteDto.create(parseInt(dniRecibido));
            if(errorDto){
                
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarTodaLaInformacionDelPaciente","AdmisionController","141",errorDto)
                res.status(403).json(errorDto)
                return
            }
            const [errorBusqueda, pacienteEncontrado] = await PacienteServices.buscarPacienteExistente(getPacienteDto!.dni,1)
            if(!errorBusqueda){
               
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarTodaLaInformacionDelPaciente","AdmisionController","149","ERROR:No se encontro el paciente")
                res.status(404).json("ERROR: No se encontro el paciente")
                return
            }
            if(!pacienteEncontrado?.id_seguro_medico){
                
                res.status(404).json("ERROR: El paciente no tiene asignado un seguro medico")
                return
            }
                        
            const [errorSeguroMedico, seguroMedicoEncontrado] = await SeguroMedicoService.buscarSeguroMedico(pacienteEncontrado?.id_seguro_medico!);

            if(errorSeguroMedico){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarTodaLaInformacionDelPaciente","AdmisionController","160","Hubo un error al buscar el seguro medico")
                res.status(404).json("Hubo un error al buscar el seguro medico")
                return
            }
            const resultado = {
                pacienteEncontrado: pacienteEncontrado,
                seguroMedico: seguroMedicoEncontrado
            }
            res.json(resultado);
            return
        } catch (error) {
            res.status(500).json(error as string)
            return
        }
    }

    public actualizarPaciente = async(req:Request,res:Response) =>  {

        try {
            
            if(!req.session.paciente){
                res.render("AdmisionViews/principal.pug",{
                    warning:"Se cerró la sesión del paciente"
                })
                return
            }
            req.body.id_Paciente = req.session.paciente!.id_Paciente;
            if(!req.body.nombre && req.session.paciente.nombre){ res.render("AdmisionViews/ActualizarPaciente.pug",{error: "No se puede dejar el nombre vacio", paciente: req.session.paciente}); return}
            if(!req.body.apellido && req.session.paciente.apellido) {res.render("AdmisionViews/ActualizarPaciente.pug",{error: "No se puede dejar el apellido vacio", paciente: req.session.paciente});return}
            if(!req.body.direccion && req.session.paciente.direccion) {res.render("AdmisionViews/ActualizarPaciente.pug",{error: "No se puede dejar la direccion vacia", paciente: req.session.paciente});return}
            if(!req.body.telefono && req.session.paciente.telefono){ res.render("AdmisionViews/ActualizarPaciente.pug",{error: "No se puede dejar el telefono vacio", paciente: req.session.paciente});return}
           
            const [ error, updatePacienteDto] = UpdatePacienteDto.create(req.body, req.session.paciente);
            
            if(error){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarPaciente","AdmisionController", "Line 53", error)
                throw new Error(error);               
            }
            let modo = 1;
            if((String(updatePacienteDto?.dni) != String(req.session.paciente?.dni)) && req.session.paciente.dni != null){
                res.render("AdmisionViews/ActualizarPaciente.pug",{
                    error: "No se puede cambiar el dni del paciente, notifique al administrador",
                    paciente: req.session.paciente
                })
                return
            }
            if(req.session.paciente.dni == null) modo = 2
            const [errorInService, confirmacion] = await PacienteServices.actualizarPaciente(updatePacienteDto!,modo); 
            if(errorInService){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("ActualizarPaciente","AdmisionController","57",errorInService);    
                res.render("AdmisionViews/ActualizarPaciente.pug",{
                    error: `${errorInService}`,
                    paciente: req.session.paciente
                })
                return
            }
            if(confirmacion){
                               
                const pacienteEncontrado = await PacienteServices.buscarPacienteExistente(updatePacienteDto!.dni!,1)
                if(pacienteEncontrado[0]) req.session.paciente = pacienteEncontrado[1]?.dataValues;
                
                
                res.render("AdmisionViews/ActualizarPaciente.pug",{
                    success: "Paciente actualizado",
                    paciente: req.session.paciente
                })
                return
            }

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarPaciente","AdmisionController", "Line 40", error as string);
            res.render("AdmisionViews/ActualizarPaciente.pug",{
                    error: `${error}`,
                    paciente: req.session.paciente

                });
            
            return;            
        }
    }
    ///////////////////////////////////////////////////
    ////////////////////!SEGURO MEDICO/////////////////
    ///////////////////////////////////////////////////
    public getSeguroMedico = async(req:Request, res:Response) => { //todo: DEBERIA FUNCIONAR

        try {
            const [errorDto, numeroDeSeguroMedico] = getSeguroMedicoDTO.create(req.params.numero)
            if(errorDto){
                res.status(400).json(errorDto)
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getSeguroMedico","AdmisionController","205",errorDto)
                return
            }
            const [errorBusqueda, seguroMedicoBuscado] = await SeguroMedicoService.buscarSeguroMedicoExistente(getSeguroMedicoDTO.toObject(numeroDeSeguroMedico!).numero,1)
            if(!errorBusqueda){
                res.status(404).json("No se encontro el seguro medico")
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getSeguroMedico", "AdmisionController","210","No se encontro el seguro medico")
                return
            }
            res.status(200).json(seguroMedicoBuscado)
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getSeguroMedico","AdmisionController", "213", error as string)
            res.status(500).json(error as string)
            return
        }

    }
     public registrarYAsignarSeguroMedico = async(req:Request,res:Response) => { //*FUNCA
         try{
            if(!req.session.paciente){
                    res.render("AdmisionViews/principal.pug",{
                        warning:"Se cerró la sesión del paciente"
                    })
                    return
                }
            if(!req.body){
                res.redirect("/admision/crear/seguro/medico")
                return
            }
            const objetoParaCrearSeguroMedico = {
                id_mutual: req.body.id_mutual,
                numero: req.body.numero,
                id_categoria_seguro: req.body.id_categoria_seguro,
                dni_Paciente: req.session.paciente?.dni
            }

             const [ error, createSeguroMedicoDto ] = CreateSeguroMedicoDto.create(objetoParaCrearSeguroMedico);
             if(error){
                 HelperForCreateErrors.errorInMethodXClassXLineXErrorX("registrarYAsignarSeguroMedico","AdmisionController", "Line 85", error);
          
                res.render("AdmisionViews/crearSeguroMedico.pug",{
                    error: `${error}`
                })
                 
                 return
             }
             const [ errorCrearSeguroMedico, confirmacion ] = await SeguroMedicoService.createSeguroMedico(createSeguroMedicoDto!);
             if(errorCrearSeguroMedico && !confirmacion){
                 HelperForCreateErrors.errorInMethodXClassXLineXErrorX("registrarYAsignarSeguroMedico","AdmisionController", "Line 87", errorCrearSeguroMedico);
                const mutuales = await SeguroMedicoService.getMutualesFromDb();
                const categorias = await SeguroMedicoService.getCategoriasFromDb();
                res.render("AdmisionViews/crearSeguroMedico.pug", {
                    paciente: req.session.paciente,
                    error: `${errorCrearSeguroMedico}`,
                    mutuales: mutuales[1],
                    categorias: categorias[1]
                })
                 return;
             }
             if(confirmacion){
                const[errorAsignarSeguroMedico, confirmacionAsignar] = await PacienteServices.asignarSeguroMedico(createSeguroMedicoDto!.numero,createSeguroMedicoDto!.dni_Paciente!);
                if(errorAsignarSeguroMedico && !confirmacionAsignar){
                    HelperForCreateErrors.errorInMethodXClassXLineXErrorX("registrarYAsignarSeguroMedico","AdmisionController", "Line 98", errorAsignarSeguroMedico);
                    res.render("AdmisionViews/crearSeguroMedico.pug",{
                    error: `${errorAsignarSeguroMedico}`
                    })
                    return;
                }
            }
            req.session.paciente!.id_seguro_medico = confirmacion?.dataValues.id_seguro_medico;
            res.redirect(`/admision/principal/paciente?confirmacion=${encodeURIComponent("Se creo y asigno el seguro al paciente")}`)
            
            console.log("Se creo el seguro y se le asigno al paciente");
            return
         }catch(error){
             HelperForCreateErrors.errorInMethodXClassXLineXErrorX("registrarYAsignarSeguroMedico","AdmisionController" ,"Line 105",(error as string));
            res.render("AdmisionViews/crearSeguroMedico.pug",{
                error: `${error}`
            })
            return
         }
     }
    public actualizarSeguroMedico = async(req:Request,res:Response) => { //todo: Deberia funcionar pero hay que adaptarlo y testearlo

        try {
            const[ error, updateSeguroMedicoDto] = UpdateSeguroMedicoDto.create(req.body);
            if(error){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarSeguroMedico","AdmisionController", "Line 117", error);
                return res.redirect(`/admision/actualizar/seguro/medico?error=${encodeURIComponent(error)}`)             
            }
            const [errorInService, confirmacion] = await SeguroMedicoService.updateSeguroMedico(updateSeguroMedicoDto!,req.session.paciente!.id_seguro_medico,req.session.paciente!.id_Paciente);
            if(errorInService && !confirmacion){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarSeguroMedico","AdmisionController", "Line 123", errorInService);
                return res.redirect(`/admision/actualizar/seguro/medico?error=${encodeURIComponent(errorInService)}`)             

            }
            console.log("Seguro médico actualizado: ");
            res.redirect(`/admision/actualizar/seguro/medico?confirmacion=${encodeURIComponent("Seguro medico actualizado")}`);
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarSeguroMedico","AdmisionController", "Line 130",error as string);
            res.redirect(`/admision/actualizar/seguro/medico?error=${encodeURIComponent(error as string)}`)
            return
        }

    }
    ////////////////////////////////////////////////
    //////////////!ADMISIONES///////////////////////
    ////////////////////////////////////////////////

    public crearAdmision = async(req:Request,res:Response) => { //!FALTA TESTEAR 

        try {
            if(!req.session.paciente){
                res.redirect(`/admision/?error=${encodeURIComponent("Se ha cerrado la sesion")}`)
                return
            }

            const [ error, crearAdmisionDto ] = CrearAdmisionDto.create({
                id_motivo_de_Internacion: req.body.id_motivo_de_Internacion,
                id_prioridad_de_atencion: req.body.id_prioridad_de_atencion,
                id_tipo_de_admision: req.body.id_tipo_de_admision,
                id_Paciente: req.session.paciente.id_Paciente,
                id_Cama: req.body.id_Cama
            });
            if(error){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearAdmision","AdmisionController", "Line 140", error);
                res.redirect(`/admision/crear/admision?error=${encodeURIComponent(error as string)}`)
                return
            }
            const [errorCrearAdmision, admisionCreada] = await AdmisionService.crearAdmision(crearAdmisionDto!);
            if(errorCrearAdmision){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearAdmision","AdmisionController", "Line 145", errorCrearAdmision);
                res.redirect(`/admision/crear/admision?error=${encodeURIComponent(errorCrearAdmision as string)}`)
                return
            }
            
            
            res.redirect(`/admision/principal/paciente?confirmacion=${encodeURIComponent("Se ha creado la admision")}`)

            return

        } catch (error) {
            res.status(500).json(error as string)    
            return
        }
    }

    // public actualizarAdmision = async(req:Request,res:Response) => {//!Pensar que si es necesario

    //     try {
            
    //     } catch (error) {
            
    //     }

    // }


    public getTodasLasAdmisiones = async(req:Request,res:Response) => { //!Deberia traer todas las admisiones

        try {
            
            const [ errorDeBusqueda, admisiones ] = await AdmisionService.buscarTodasLasAdmisiones(1);
            if(errorDeBusqueda){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getTodasLasAdmisiones","AdmisionController","690",errorDeBusqueda)
                res.status(404).json(`${errorDeBusqueda}`)
                return
            }
            res.status(200).json(admisiones)
            return
        } catch (error) {
            res.status(500).json(error as string)
            return
        }

    }
    public getTodasLasAdmisionesActivas = async(req:Request,res:Response) => { //!Deberia traer todas las admisiones activas

        try {
            
            const [ errorDeBusqueda, admisionesActivas ] = await AdmisionService.buscarTodasLasAdmisiones(0);
            if(errorDeBusqueda){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getTodasLasAdmisiones","AdmisionController","299",errorDeBusqueda)
                res.status(404).json(`${errorDeBusqueda}`)
                return
            }
            res.status(200).json(admisionesActivas)
            return
        } catch (error) {
            res.status(500).json(error as string)
            return
        }

    }
    public buscarAdmisionPorPaciente = async(req:Request,res:Response) => {

        try{
            const [ errorDto, getAdmisionPacienteDto ] = GetAdmisionPorPacienteDTO.create(parseInt(req.params.dni));
            if(errorDto){
                res.status(404).json(`${errorDto}`)
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarAdmisionPorPaciente","AdmisionController","301",errorDto)
                return
            }
            const [errorBusquedaDePaciente, pacienteEncontrado] = await PacienteServices.buscarPacienteExistente(getAdmisionPacienteDto?.dni!,1);
            if(!errorBusquedaDePaciente) {
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("BuscarAdmisionPorPaciente","AdmisionController","305","No se encontro el paciente")
                res.status(404).json(`No se encontro el paciente`)
                return
            }
            console.log(pacienteEncontrado);
            
            const [errorBusquedaDeAdmisionIndividual, admisionEncontrada] = await AdmisionService.buscarAdmisionVigentePorPaciente(pacienteEncontrado?.dataValues.id_Paciente!)
            if(errorBusquedaDeAdmisionIndividual){
                res.status(404).json(`${errorBusquedaDeAdmisionIndividual}`)
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("BuscarAdmisionPorPaciente","AdmisionController","311",errorBusquedaDeAdmisionIndividual)
                return
            }
            res.status(200).json(admisionEncontrada)
            return
        }catch(error){
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarAdmisionPorPaciente","AdmisionController","310",error as string)
            res.status(500).json(`${error}`)
            return
        }

    }
    public updateAdmision = async(req:Request, res:Response) => {

        try {
            if(!req.session.paciente){
                res.redirect(`/admision/?error=${encodeURI("Se ha cerrado la sesion")}`)
                return
            }
            if(!req.session.admision){
                res.redirect(`/admision/principal/paciente?error=${encodeURI("No hay una admision activa")}`)
                return
            }
            const [errorDto, dtoAdmision ] = ActualizarAdmisionDto.create({
                estado: req.body.estado,
                id_motivo_de_Internacion: req.body.id_motivo_de_Internacion,
                id_prioridad_de_atencion: req.body.id_prioridad_de_atencion,
                id_tipo_de_admision: req.body.id_tipo_de_admision,
                id_Paciente:req.session.paciente?.id_Paciente,
                id_Cama: req.body.id_Cama
            })
            if(errorDto){
                res.redirect(`/admision/principal/paciente?error=${encodeURI(errorDto)}`)
                return
            }
            const [errorAdmision, admision] = await AdmisionService.actualizarAdmision(dtoAdmision!);
            if(errorAdmision){
                res.redirect(`/admision/principal/paciente?error=${encodeURIComponent("No hay admisiones activas")}`)
                return
            }
            if((req.body.id_Cama != null && req.body.id_Cama != req.session.admision.id_Cama)|| req.body.estado == "Baja") {
                CamaService.marcarCamaComoLibre(req.session.admision.id_Cama);
                if(req.body.estado == "Baja"){
                    res.redirect(`/admision/principal/paciente?confirmacion=${encodeURIComponent("Se ha dado de baja la admision")}`)
                    req.session.admision = undefined;
                    req.session.restosAdmision = undefined;
                    return
                }
            }
            const [ error, admisionActualizada ] = await AdmisionService.buscarAdmisionVigentePorPaciente(req.session.paciente.id_Paciente);
            if(error){
                res.redirect(`/admision/actualizar/admision?error=${encodeURIComponent(error)}`)
                return
            }
            req.session.admision = admisionActualizada
            const alaOcupada = await CamaService.buscarCama(req.session.admision!.id_Cama);
            req.session.restosAdmision= alaOcupada[1]?.dataValues.habitacion.dataValues.ala.dataValues.nombre;
            
            res.redirect(`/admision/principal/paciente?confirmacion=${encodeURIComponent("Se ha actualizado el registro")}`)
            return

        } catch (error) {
            res.redirect(`/admision/?error=${encodeURI(error as string)}`)
            return
        }
    }
    public admitirPacienteDeEmergencia = async (req: Request, res: Response): Promise<void> => {
        try {
            
            
            const { ala, unidad, genero, id_motivo_de_Internacion, id_Cama } = req.body;
            

            //const habitaciones = await HabitacionService.getHabitacionesDisponibles(genero, ala);
            let pacienteAnonimo;
            // if (habitaciones[0]) {
            //     HelperForCreateErrors.errorInMethodXClassXLineXErrorX("admitirPacienteDeEmergencia","AdmisionController","56","No hay habitaciones disponibles")

            //     const alas = await AlaService.getAlaFromDb();
            //     const motivosDeInternacion = await MotivosDeInternacionService.buscarMotivosDeInternacion();
            //     res.render("AdmisionViews/emergencia.pug", {
            //         error: `${habitaciones[0]}`,
            //         alas: alas,
            //         motivoDeInternacion: motivosDeInternacion[1]
            //     });
            //     return;
            // }
            if(genero =="Masculino"){
                pacienteAnonimo = PacienteAnonimo.getPacienteMasculina()
            }else{
                pacienteAnonimo = PacienteAnonimo.getPacienteFemenina()
            }
            
            
            const[ error, pacienteListoDto] = await CreatePacienteNNDto.create(pacienteAnonimo)
            if(error){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("admitirPacienteDeEmergencia","AdmisionController","439",error)
                const alas = await AlaService.getAlaFromDb();
                const motivosDeInternacion = await MotivosDeInternacionService.buscarMotivosDeInternacion();
                res.status(500).render("AdmisionViews/emergencia.pug", {
                    error: `${error}`,
                    alas: alas,
                    motivoDeInternacion: motivosDeInternacion[1]
                });
                return
            }
            const [errorAlCrear, pacienteCreado] = await PacienteServices.crearPacienteNN(pacienteListoDto!)
            
            if(errorAlCrear){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("AdmitirPacienteDeEmergencia","AdmisionController","72",errorAlCrear)
                const alas = await AlaService.getAlaFromDb();
                const motivosDeInternacion = await MotivosDeInternacionService.buscarMotivosDeInternacion();
                res.status(500).render("AdmisionViews/emergencia.pug", {
                    error: `${errorAlCrear}`,
                    alas: alas,
                    motivoDeInternacion: motivosDeInternacion[1]
                });
                return
            }
           
            const [errorDto, crearAdmisionDTO] = CrearAdmisionDto.create({//! Cambiar id_Cama por la que se envia
                
                id_motivo_de_Internacion: id_motivo_de_Internacion, 
                id_tipo_de_admision: 3,
                id_prioridad_de_atencion: 1,
                id_Paciente: pacienteCreado?.dataValues.id_Paciente,
                id_Cama: id_Cama
            })
            if(errorDto){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("admitirPacienteDeEmergencia","AdmisionController","468",errorDto)
                const alas = await AlaService.getAlaFromDb();
                const motivosDeInternacion = await MotivosDeInternacionService.buscarMotivosDeInternacion();
                res.render("AdmisionViews/emergencia.pug", {
                    error: `${errorDto}`,
                    alas: alas,
                    motivoDeInternacion: motivosDeInternacion[1]
                });
                return;
            }
           
            const [errorAlCrearAdmision,confirmacion, admisionCreada] = await AdmisionService.crearAdmision(CrearAdmisionDto.toObject(crearAdmisionDTO!))
            if(!confirmacion){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("admitirPacienteDeEmergencia","AdmisionController","479",errorAlCrearAdmision!)
                const alas = await AlaService.getAlaFromDb();
                const motivosDeInternacion = await MotivosDeInternacionService.buscarMotivosDeInternacion();
                res.render("AdmisionViews/emergencia.pug", {
                    error: `${errorAlCrearAdmision}`,
                    alas: alas,
                    motivoDeInternacion: motivosDeInternacion[1] 
                });
                return;
            }
            const [errorCama, cama ] = await CamaService.buscarCama(id_Cama);
            if(errorCama) throw Error(errorCama)
            console.log(cama!.dataValues.habitacion.dataValues.ala.dataValues.nombre);
            console.log(cama!.dataValues.habitacion.dataValues.nro_Habitacion);
        
            
            res.render("AdmisionViews/habitacion.pug", {
                success: "Paciente Admitido",
                nombre_ala: cama!.dataValues.habitacion.dataValues.ala.dataValues.nombre,
                nro_habitacion: cama!.dataValues.habitacion.dataValues.nro_Habitacion,
                id_Paciente: pacienteCreado?.dataValues.id_Paciente
            });
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("admitirPacienteDeEmergencia", "AdmisionController","107",error as string)
            const alas = await AlaService.getAlaFromDb();
            const motivosDeInternacion = await MotivosDeInternacionService.buscarMotivosDeInternacion();
            res.status(500).render("AdmisionViews/emergencia.pug", {
                error: error instanceof Error ? error.message : "Error desconocido",
                alas: alas,
                motivoDeInternacion: motivosDeInternacion[1]
            });
            return
        }

    };
    // public getHabitacionesByGender = async(req:Request,res:Response) => {
    //     try{
    //         const {ala,unidad,genero,motivo} = req.body;

    //     }catch(error){
    //         console.log(HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getHabitaciones","AdmisionController","Line 142",error as string));
    //         //res.status(500).render("error",{message: "Error al obtener las habitaciones"})//Enviar con render
    //     }
    // }
    public bajaLogicaAdmision = async (req: Request, res: Response) => {//!Me pase de cervezas, deberia funcionar pero no lo testee ;)

        try {
            if(!req.body.id_Admision ){
                res.status(400).json("Se requiere el id de la admision")
                return
            }
            
            const [error, confirmacion] = await AdmisionService.bajaLogicaAdmision(req.body.id_Admision);
            if (error) {
                res.status(500).json(error);
                return;
            }
            res.status(200).json(confirmacion);
        } catch (error) {
            res.status(500).json(error as string);
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("bajaLogicaAdmision","AdmisionController","Line 584",error as string)
            return
        }
    }
    public altaLogicaAdmision = async (req: Request, res: Response) => {//!Me pase de cervezas, deberia funcionar pero no lo testee ;)

        try {
            if(!req.body.id_Admision ){
                res.status(400).json("Se requiere el id de la admision")
                return
            }
            
            const [error, confirmacion] = await AdmisionService.altaLogicaAdmision(req.body.id_Admision);
            if (error) {
                res.status(500).json(error);
                return;
            }
            res.status(200).json(confirmacion);
            return
        } catch (error) {
            res.status(500).json(error as string);
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("altaLogicaAdmision","AdmisionController","Line 584",error as string)
            return
        }
    }
    ///////////////////////////////////////////////
    ////////////////!TURNOS///////////////////////
    ///////////////////////////////////////////////

    // public crearTurno = async(req:Request,res:Response) => {
    //     try {
            
    //     } catch (error) {
            
    //     }
    // }

    /////////////////////////////////////////////////
    ////////////!Habitaciones/////////////////////////
    ////////////////////////////////////////////////
    
    public getHabitacionesDisponiblesPorGenero = async(req:Request, res:Response) => {

        try {
            
            if(!req.query.ala || !req.query.genero){
                res.redirect(`/admision/emergencia?error=${encodeURIComponent("Se requiere el genero y ala")}`)
                return
            }
            
            
            const habitacionesDisponibles = await HabitacionService.getHabitacionesDisponibles(req.query.genero as string,req.query.ala as string);
            if(habitacionesDisponibles[0]){
                //res.redirect(`/admision/emergencia?error=${encodeURIComponent(`${habitacionesDisponibles[0]}`)}`)
                res.status(404).json({error: habitacionesDisponibles[0].toString()})
                console.log(habitacionesDisponibles[1]);
                
                return
            }
            type enviar= {
                nro_habitacion: number,
                id_cama: number
            }
            const habitacionesParseadas: enviar[] = []
            for(let a of habitacionesDisponibles[1]){
                if(a.camas){
                   
                    const objectoCreado:enviar = {
                        nro_habitacion: a.nro_habitacion,
                        id_cama: a.camas.id_cama_1
                    }
                    habitacionesParseadas.push(objectoCreado)
                    if(a.camas.id_cama_2){
                        const objectoCreado:enviar = {
                        nro_habitacion: a.nro_habitacion,
                        id_cama: a.camas.id_cama_2
                        }
                        habitacionesParseadas.push(objectoCreado)
                    }
                }
                
            }
            
            res.status(200).json({camas: habitacionesParseadas})
            return
        } catch (error) {
            res.status(500).json({error: error})
            return
        }
    }
    public getHabitacionesByAla = async(req:Request, res:Response) => { 
    
        try {
            if(!req.query.ala && !req.query.disponible){
                res.status(400).json("Se requiere el ala y la disponibilidad")
                return
            }
            let queryDisponible = req.query.disponible;
            if( req.query.disponible && queryDisponible == "todos"){
                
                queryDisponible = null;
            }
            if(queryDisponible !== null && queryDisponible != "disponible" && queryDisponible != "noDisponible"){
                res.status(400).json("El parametro disponible debe ser disponible o noDisponible o todos")
                return
            }
            let disponibilidad ;
            if(queryDisponible == null){
                disponibilidad = null
            }
            if(queryDisponible == "disponible"){
                disponibilidad = true
            }
            if(queryDisponible == "noDisponible"){
                disponibilidad = false
            }

            const [error, habitacionesEncontradas] = await HabitacionService.getHabitacionesByAla(req.query.ala as string, disponibilidad);
            if(error){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getHabitacionesByAla","AdmisionController","Line 1150",error as string)
                res.status(404).json(error as string);
                return
            }
            res.status(200).json(habitacionesEncontradas);
            return 
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getHabitacionesByAla","AdmisionController","Line 1157",error as string)
            res.status(500).json({error: error})
            return 
        }

    }
    ////////////////////////////////////
    ////////////////!Camas//////////////
    public getHabitacionByCamaId = async(req:Request, res:Response) => {
        try {
            if(!req.session.admision){
                res.status(400).json("No hay una admision activa")
                return
            }
            const [ error, camaActual] = await CamaService.buscarCama(req.session.admision!.id_Cama);
            if(error){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getHabitacionByCamaId","AdmisionController","Line 660",error as string)
                res.status(404).json(error as string);
                return
            }
            console.log(camaActual?.dataValues);
            
            res.status(200).json({
                id_Cama: camaActual?.dataValues.id_Cama,
                nro_Habitacion: camaActual?.dataValues.habitacion.dataValues.nro_Habitacion,
            });
            
        } catch (error) {
            
            res.status(500).json(error as string);
        }
    }
    //////////////////////////////!
    ////////////! Turnos /////////!
    //////////////////////////////!

    public getAllTurnosInDay = async(req:Request, res:Response) => { //VER TODOS LOS TURNOS DEL DIA //todo: Testear y completar los redireccionamientos y vistas
        try {
            const [ error, turnosDelDia ] = await TurnosService.getAllTurnosByDate(new Date().toISOString().split("T")[0]);
            if(error){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getAllTurnosInDay","AdmisionController","Line 1242",error as string)
                res.redirect(`/admision/?error=${encodeURI(`${error}`)}`)
                return
            }
            //res.render("AdmisionViews/turnos.pug",{turnos:turnosDelDia}) //todo: Implementar renderizado de turnos
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getAllTurnosInDay","AdmisionController","Line 1251",error as string)
            res.redirect(`/admision/?error=${encodeURI(`${error}`)}`)
            return
        }
    }

    public getTurnosByPaciente = async(req:Request, res:Response) => { //todo: Testear y completar los redireccionamientos y vistas
        try {
            const estado = req.query.estado ? (req.query.estado === "true" ? true : false) : true; //por defecto trae los turnos activos
            if(!req.session.paciente){
                res.redirect(`/admision/?error=${encodeURI("Se cerro la sesion del paciente")}`)
                return 
            }
            const [error, turnosDelPaciente] = await TurnosService.getTurnosByPacienteId(req.session.paciente.id_Paciente, estado);
            if(error){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getTurnosByPaciente","AdmisionController","Line 1266",error as string)
                res.redirect(`/admision/principal/paciente?error=${encodeURI(`${error}`)}`)
                return
            }
            //res.render("AdmisionViews/turnos.pug", {turnos: turnosDelPaciente});//todo: Implementar renderizado de turnos
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getTurnosByPaciente","AdmisionController","Line 1258",error as string)
            res.redirect(`/admision/principal/paciente?error=${encodeURI(`${error}`)}`)
            return
        }
    }

    public crearTurno = async(req:Request,res:Response) => { //todo: Testear y completar los redireccionamientos y vistas

        try {
            const {fecha,id_horario_turno,motivo,id_Medico} = req.body;
            if(!req.session.paciente){
                res.redirect(`/admision/?error=${encodeURIComponent("Se ha cerrado la sesion del paciente")}`)
                return
            }
            const [ errorDto, crearTurnoDto] = CrearTurnoDto.create({
                fecha: fecha,
                id_horario_turno: id_horario_turno,
                id_Paciente: req.session.paciente.id_Paciente,
                motivo: motivo,
                id_Medico: id_Medico                
            })
            if(errorDto){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearTurno","AdmisionController","Line 1282",errorDto);
                //res.redirect(`/admision/crear/turno?error=${encodeURIComponent(errorDto)}`)//todo: Crear vista de crear turno y redireccionar a ella, Agregar alerta por query
                return
            }
            const[ errorCrearTurno, turnoCreado] = await TurnosService.createTurno(CrearTurnoDto.toObject(crearTurnoDto));
            if(errorCrearTurno){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearTurno","AdmisionController","Line 1302",errorCrearTurno);
                //res.redirect(`/admision/crear/turno?error=${encodeURIComponent(errorCrearTurno)}`)//todo: Crear vista de crear turno y redireccionar a ella Agregar alerta por query
                return
            }
            res.redirect(`/admision/principal/paciente?confirmacion=${encodeURIComponent("Turno creado correctamente")}`)
            return
        
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearTurno","AdmisionController","Line 1302",error as string)
            res.redirect(`/admision/principal/paciente?error=${encodeURIComponent(`${error}`)}`)
            return
        }
    } 
    public actualizarTurno = async(req:Request,res:Response) => {//!No hace falta hacer una sesion para turno, cuando se llame a la vista, hacer que la vista busque el turno por id y lo muestre en los campos del formulario, luego al enviar el formulario se actualiza el turno
        try{
            if(!req.session.paciente){
                res.redirect(`/admision/?error=${encodeURIComponent("Se ha cerrado la sesion del paciente")}`)
                return
            }
            const {id_turno, fecha, id_horario_turno, motivo, id_Medico,estado} = req.body;
            const [errorDto, _updateTurnoDto] = updateTurnoDto.create({
                id_turno: id_turno,
                fecha: fecha,
                id_horario_turno: id_horario_turno,
                motivo: motivo,
                id_Medico: id_Medico,
                id_Paciente: req.session.paciente.id_Paciente,
                estado : estado
            });
            if(errorDto){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarTurno","AdmisionController","Line 1334",errorDto);
                //res.redirect(`/admision/actualizar/turno?error=${encodeURIComponent(`${errorDto}`)}`)//todo: Crear vista de actualizar turno y redireccionar a ella, Agregar alerta por query
                return
            }
            const [errorActualizarTurno, confirmacion] = await TurnosService.updateTurno(_updateTurnoDto!);
            if(errorActualizarTurno){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarTurno","AdmisionController","Line 1340",errorActualizarTurno);
                //res.redirect(`/admision/actualizar/turno?error=${encodeURIComponent(`${errorActualizarTurno}`)}`)//todo: Crear vista de actualizar turno y redireccionar a ella, Agregar alerta por query
                return
            }
            //res.redirect(`/admision/principal/paciente?confirmacion=${encodeURIComponent("Turno actualizado correctamente")}`)//todo: Analizar si se redirecciona a la vista de paciente o a la de turnos
            return

        }catch(error){
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarTurno","AdmisionController","Line 1317",error as string)
            res.redirect(`/admision/principal/paciente?error=${encodeURIComponent(`${error}`)}`)
            return
        }
    } 
    public eliminarTurno = async(req:Request,res:Response) => {

        try {
            
        } catch (error) {
            
        }

    } 


    //////////////////////////////!
    ////////////! TEST ///////////
    //////////////////////////////!

    public test = async(req:Request,res:Response)=> {

         try {
            
            
            const[ error, confirmacion] = await TurnosService.getAllTurnosByDate("2023-05-39");
            if(error){
                res.json({error:error})
                console.log(error);
                
                return
            }
            console.log(confirmacion);
            res.json(confirmacion)

            return
        } catch (error) {
            res.json(error)
            return
        }

    }

}
