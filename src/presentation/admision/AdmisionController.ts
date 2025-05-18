import { Request, Response } from "express";
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



export class AdmisionController{
    private conexionBd: Conexion;
    public constructor(conexionbd: Conexion){
        this.conexionBd = conexionbd;
    }
    ////////////////////////////////////////////////////
    ////////////////////!VISTAS////////////////////////
    ////////////////////////////////////////////////////
    public vistaPrincipal = async(req: Request, res:Response)=> {
        res.render("AdmisionViews/principal.pug");
       
    }
    
    


    public vistaEmergencia = async(req:Request, res:Response)=> {
        const alas = await AlaService.getAlaFromDb()
        const motivosDeInternacion = await MotivosDeInternacionService.buscarMotivosDeInternacion();
        for(let motivo of motivosDeInternacion[1]!){
            console.log(motivo.dataValues);
            
        }
        
        res.render("AdmisionViews/emergencia.pug", {
            error: "errorPersonalizado",
            success: "funciono bien",
            info: "habia un caracol rojo",
            warning: "fijate bien loco",
            alas: alas,
            motivoDeInternacion:motivosDeInternacion[1] 
        }) 
        
    }
    public vistaBuscarPorDni = async ( req:Request, res:Response)=> {
        res.render("AdmisionViews/buscarPaciente.pug")
    }

    public vistaCrearPaciente = async ( req:Request, res:Response)=>{
        res.render("AdmisionViews/CrearPaciente.pug", {
            warning: "El paciente no se encontró registrado. Va a proceder a crear una cuenta"

        })
    }
    public vistaPrincipalPaciente = async( req:Request, res:Response)=> {//todo: Posiblemente no se use
        const paciente = req.session.paciente;
        if(!paciente){
            res.render("AdmisionViews/buscarPaciente.pug", {
                warning: "Se cerró la sesión del paciente"})
            return
        }
        res.render("AdmisionViews/vistaPaciente.pug" , {paciente: paciente})

    }

    public vistaActualizarPaciente = async(req:Request, res:Response) => {
        
        if(!req.session.paciente){
            res.render("AdmisionViews/principal.pug",{
                warning:"Se cerró la sesión del paciente"
            })
        }
        
        
        res.render("AdmisionViews/ActualizarPaciente.pug", {paciente: req.session.paciente})
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
            }
                
            req.session.paciente = pacienteCreado?.dataValues;
            
            res.render("AdmisionViews/vistaPaciente.pug", {
                paciente: req.session.paciente
            })

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
                
                res.render("AdmisionViews/CrearPaciente.pug", {
                    warning: "El paciente no se encontró registrado. Va a proceder a crear una cuenta"
                })
                return
            }
            req.session.paciente = pacienteEncontrado?.dataValues;
            
            res.status(200).render("AdmisionViews/vistaPaciente",{paciente: req.session.paciente})
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarPacientePorDni","AdmisionController","208",error as string)
            res.status(500).json(error as string)
            res.status(500).render("AdmisionViews/buscarPaciente.pug",{
                error: `${error}`
            })
        }
    }
    public buscarTodaLaInformacionDelPaciente = async(req:Request,res:Response) => {

        try {
            const dniRecibido = req.params.dni ;
            const [errorDto, getPacienteDto] = GetPacienteDto.create(parseInt(dniRecibido));
            if(errorDto){
                
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarTodaLaInformacionDelPaciente","AdmisionController","141",errorDto)
                res.status(403).json(errorDto)
            }
            const [errorBusqueda, pacienteEncontrado] = await PacienteServices.buscarPacienteExistente(getPacienteDto!.dni,1)
            if(!errorBusqueda){
               
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarTodaLaInformacionDelPaciente","AdmisionController","149","ERROR:No se encontro el paciente")
                res.status(404).json("ERROR: No se encontro el paciente")
            }
            if(!pacienteEncontrado?.id_seguro_medico){
                
                res.status(404).json("ERROR: El paciente no tiene asignado un seguro medico")
            }
                        
            const [errorSeguroMedico, seguroMedicoEncontrado] = await SeguroMedicoService.buscarSeguroMedico(pacienteEncontrado?.id_seguro_medico!);

            if(errorSeguroMedico){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarTodaLaInformacionDelPaciente","AdmisionController","160","Hubo un error al buscar el seguro medico")
                res.status(404).json("Hubo un error al buscar el seguro medico")
            }
            const resultado = {
                pacienteEncontrado: pacienteEncontrado,
                seguroMedico: seguroMedicoEncontrado
            }
            res.json(resultado);
        } catch (error) {
            res.status(500).json(error as string)
        }
    }

    public actualizarPaciente = async(req:Request,res:Response) =>  {

        try {
            let alerta = false;
            if(!req.session.paciente){
                res.render("AdmisionViews/principal.pug",{
                    warning:"Se cerró la sesión del paciente"
                })
                return
            }
            req.body.id_Paciente = req.session.paciente!.id_Paciente;
            if(!req.body.nombre && req.session.paciente.nombre) res.render("AdmisionViews/ActualizarPaciente.pug",{error: "No se puede dejar el nombre vacio", paciente: req.session.paciente})
            if(!req.body.apellido && req.session.paciente.apellido) res.render("AdmisionViews/ActualizarPaciente.pug",{error: "No se puede dejar el apellido vacio", paciente: req.session.paciente})
            if(!req.body.direccion && req.session.paciente.direccion) res.render("AdmisionViews/ActualizarPaciente.pug",{error: "No se puede dejar la direccion vacia", paciente: req.session.paciente})
            if(!req.body.telefono && req.session.paciente.telefono) res.render("AdmisionViews/ActualizarPaciente.pug",{error: "No se puede dejar el telefono vacio", paciente: req.session.paciente})
            const [ error, updatePacienteDto] = UpdatePacienteDto.create(req.body, req.session.paciente);
            
            if(error){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarPaciente","AdmisionController", "Line 53", error)
                throw new Error(error);               
            }
            
            if(String(updatePacienteDto?.dni) != String(req.session.paciente?.dni)){
                res.render("AdmisionViews/ActualizarPaciente.pug",{
                    error: "No se puede cambiar el dni del paciente, notifique al administrador",
                    paciente: req.session.paciente
                })
                return
            }
            const [errorInService, confirmacion] = await PacienteServices.actualizarPaciente(updatePacienteDto!); 
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
            }
            const [errorBusqueda, seguroMedicoBuscado] = await SeguroMedicoService.buscarSeguroMedicoExistente(getSeguroMedicoDTO.toObject(numeroDeSeguroMedico!).numero,1)
            if(!errorBusqueda){
                res.status(404).json("No se encontro el seguro medico")
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getSeguroMedico", "AdmisionController","210","No se encontro el seguro medico")
            }
            res.status(200).json(seguroMedicoBuscado)
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getSeguroMedico","AdmisionController", "213", error as string)
            res.status(500).json(error as string)
        }

    }
    // public registrarYAsignarSeguroMedico = async(req:Request,res:Response) => { //!deprecated: creo que no va aser utilizado

    //     try{
    //         const [ error, createSeguroMedicoDto ] = CreateSeguroMedicoDto.create(req.body);
    //         if(error){
    //             HelperForCreateErrors.errorInMethodXClassXLineXErrorX("registrarYAsignarSeguroMedico","AdmisionController", "Line 85", error);
                
                
    //             res.status(404).json(`${error}`)
    //             return
    //         }
    //         const [ errorCrearSeguroMedico, confirmacion ] = await SeguroMedicoService.createSeguroMedico(createSeguroMedicoDto!);
    //         if(errorCrearSeguroMedico && !confirmacion){
    //             HelperForCreateErrors.errorInMethodXClassXLineXErrorX("registrarYAsignarSeguroMedico","AdmisionController", "Line 87", errorCrearSeguroMedico);
    //             //res.status(500).render("error",{message: "Error al registrar el seguro médico"})//Enviar con render
    //             res.status(500).json({messageError: errorCrearSeguroMedico})
    //             return;
    //         }
    //         if(confirmacion){
    //             const[errorAsignarSeguroMedico, confirmacionAsignar] = await PacienteServices.asignarSeguroMedico(createSeguroMedicoDto!.numero,createSeguroMedicoDto!.dni_Paciente);
    //             if(errorAsignarSeguroMedico && !confirmacionAsignar){
    //                 HelperForCreateErrors.errorInMethodXClassXLineXErrorX("registrarYAsignarSeguroMedico","AdmisionController", "Line 98", errorAsignarSeguroMedico);
    //                 //res.status(500).render("error",{message: "Error al asignar el seguro médico"})//Enviar con render
    //                 res.status(500).json({messageError: errorAsignarSeguroMedico})
    //                 return;
    //             }else{
    //                 res.status(200).json({message: "Todo ok, se le asigno el seguro medico al paciente"})
    //             }
    //         }
    //     }catch(error){
    //         HelperForCreateErrors.errorInMethodXClassXLineXErrorX("registrarYAsignarSeguroMedico","AdmisionController" ,"Line 105",(error as string));
    //         //res.status(500).render("error",{message: "Error al registrar el seguro médico"})//Enviar con render
    //         res.status(500).json({message: (error instanceof Error) ? error.message : "Unknown error"})
            
    //     }
    // }
    public actualizarSeguroMedico = async(req:Request,res:Response) => { //todo: Deberia funcionar pero hay que adaptarlo y testearlo

        try {
            console.log(req.body);
            const[ error, updateSeguroMedicoDto] = UpdateSeguroMedicoDto.create(req.body);

            if(error){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarSeguroMedico","AdmisionController", "Line 117", error);
                res.status(404).json(`${error}`)//Enviar con render
                
            }
            const [errorInService, confirmacion] = await SeguroMedicoService.updateSeguroMedico(updateSeguroMedicoDto!);
            if(errorInService && !confirmacion){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarSeguroMedico","AdmisionController", "Line 123", errorInService);
                //res.status(500).render("error",{message: "Error al actualizar el seguro médico"})//Enviar con render
                res.status(404).json(`${errorInService}`)
            }
            console.log("Seguro médico actualizado: " + updateSeguroMedicoDto);
            res.status(200).json({message: "Seguro medico actualizado"})
            
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarSeguroMedico","AdmisionController", "Line 130",error as string);
            res.status(500).json({messageError: error instanceof Error ? error.message : "error desconocido"})
        }

    }
    ////////////////////////////////////////////////
    //////////////!ADMISIONES///////////////////////
    ////////////////////////////////////////////////

    public crearAdmision = async(req:Request,res:Response) => { //!FALTA TESTEAR 

        try {
            const [ error, crearAdmisionDto ] = CrearAdmisionDto.create(req.body);
            if(error){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearAdmision","AdmisionController", "Line 140", error);
                res.status(404).json(`${error}`)
                return
            }
            const [errorCrearAdmision, admisionCreada] = await AdmisionService.crearAdmision(crearAdmisionDto!);
            if(errorCrearAdmision){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearAdmision","AdmisionController", "Line 145", errorCrearAdmision);
                res.status(404).json(`${errorCrearAdmision}`)
                return
            }
            res.status(200).json(admisionCreada)


        } catch (error) {
            res.status(500).json(error as string)    
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
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getTodasLasAdmisiones","AdmisionController","299",errorDeBusqueda)
                res.status(404).json(`${errorDeBusqueda}`)
            }
            res.status(200).json(admisiones)
        } catch (error) {
            res.status(500).json(error as string)
        }

    }
    public getTodasLasAdmisionesActivas = async(req:Request,res:Response) => { //!Deberia traer todas las admisiones activas

        try {
            
            const [ errorDeBusqueda, admisionesActivas ] = await AdmisionService.buscarTodasLasAdmisiones(0);
            if(errorDeBusqueda){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getTodasLasAdmisiones","AdmisionController","299",errorDeBusqueda)
                res.status(404).json(`${errorDeBusqueda}`)
            }
            res.status(200).json(admisionesActivas)
        } catch (error) {
            res.status(500).json(error as string)
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
        }catch(error){
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarAdmisionPorPaciente","AdmisionController","310",error as string)
            res.status(500).json(`${error}`)
        }

    }
    public admitirPacienteDeEmergencia = async (req: Request, res: Response): Promise<void> => {
        try {
            console.log(req.body);
            
            const { ala, unidad, genero, id_motivo_de_Internacion } = req.body;
            

            const habitaciones = await HabitacionService.getHabitacionesDisponibles(genero, ala);
            let pacienteAnonimo;
            if (habitaciones[0]) {
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("admitirPacienteDeEmergencia","AdmisionController","56","No hay habitaciones disponibles")

                const alas = await AlaService.getAlaFromDb();
                const motivosDeInternacion = await MotivosDeInternacionService.buscarMotivosDeInternacion();
                res.render("AdmisionViews/emergencia.pug", {
                    error: `${habitaciones[0]}`,
                    alas: alas,
                    motivoDeInternacion: motivosDeInternacion[1]
                });
                return;
            }
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
           
            const [errorDto, crearAdmisionDTO] = CrearAdmisionDto.create({
                
                id_motivo_de_Internacion: id_motivo_de_Internacion, 
                id_tipo_de_admision: 3,
                id_Paciente: pacienteCreado?.dataValues.id_Paciente,
                id_Cama: habitaciones[1][0].camas.id_cama_1
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
            res.render("AdmisionViews/habitacion.pug", {
                success: "Paciente Admitido",
                habitacion: habitaciones[1][0],
                id_Paciente: pacienteCreado?.dataValues.id_Paciente
            });
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("admitirPacienteDeEmergencia", "AdmisionController","107",error as string)
            const alas = await AlaService.getAlaFromDb();
            const motivosDeInternacion = await MotivosDeInternacionService.buscarMotivosDeInternacion();
            res.status(500).render("AdmisionViews/emergencia.pug", {
                error: error instanceof Error ? error.message : "Error desconocido",
                alas: alas,
                motivoDeInternacion: motivosDeInternacion[1]
            });
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
    static bajaLogicaAdmision = async (req: Request, res: Response) => {//!Me pase de cervezas, deberia funcionar pero no lo testee ;)

        try {
            if(!req.params.id_Admision ){
                res.status(400).json("Se requiere el id de la admision")
            }
            const id_Admision = parseInt(req.params.id_Admision);
            const [error, confirmacion] = await AdmisionService.bajaLogicaAdmision(id_Admision);
            if (error) {
                res.status(500).json(error);
                return;
            }
            res.status(200).json(confirmacion);
        } catch (error) {
            res.status(500).json(error as string);
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("bajaLogicaAdmision","AdmisionController","Line 584",error as string)
        }

    }

}
