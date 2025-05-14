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
import { Pacientes } from "../../data/models/pacientes";


export class AdmisionController{
    private conexionBd: Conexion;
    public constructor(conexionbd: Conexion){
        this.conexionBd = conexionbd;
    }

    public vistaPrincipal = async(req: Request, res:Response)=> {
        res.render("AdmisionViews/principal.pug");
       
    }

    public vistaEmergencia = async(req:Request, res:Response)=> {
        const alas = await AlaService.getAlaFromDb()
              
        res.render("AdmisionViews/emergencia.pug", {
            error: "errorPersonalizado",
            success: "funciono bien",
            info: "habia un caracol rojo",
            warning: "fijate bien loco",
            alas: alas
        }) 
        //res.render("AdmisionViews/emergencia.pug",{alas})
    }

    public admitirPacienteDeEmergencia = async (req: Request, res: Response): Promise<void> => {
        try {
            const { ala, unidad, genero, motivo } = req.body;
            

            const habitaciones = await HabitacionService.getHabitacionesDisponibles(genero, ala);
            let pacienteAnonimo;
            
            if(genero =="Masculino"){
                pacienteAnonimo = PacienteAnonimo.getPacienteMasculina()
            }else{
                pacienteAnonimo = PacienteAnonimo.getPacienteFemenina()
            }
        
            const pacienteAnonimoCreado = await Pacientes.create(pacienteAnonimo)
            if(!pacienteAnonimoCreado){
                throw Error("No se pudo crear al paciente en admitir emergencia")
            }
            if (habitaciones[0]) {
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("admitirPacienteDeEmergencia","AdmisionController","56","No hay habitaciones disponibles")

                const alas = await AlaService.getAlaFromDb();
                res.render("AdmisionViews/emergencia.pug", {
                    error: `${habitaciones[0]}`,
                    alas: alas
                });
                return;
            }
            const [errorDto, crearAdmisionDTO] = CrearAdmisionDto.create({
                tipo_De_Admision: "Emergencia",
                motivo_De_Internacion: motivo,
                id_Paciente: pacienteAnonimoCreado.dataValues.id_Paciente,
                id_Cama: habitaciones[1][0].camas.id_cama_1
            })
            if(errorDto){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("admitirPacienteDeEmergencia","AdmisionController","70",errorDto)
                const alas = await AlaService.getAlaFromDb();
                res.render("AdmisionViews/emergencia.pug", {
                    error: `${errorDto}`,
                    alas: alas
                });
                return;
            }
            
            const [errorAlCrearAdmision,confirmacion, admisionCreada] = await AdmisionService.crearAdmision(CrearAdmisionDto.toObject(crearAdmisionDTO!))
            if(!confirmacion){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("admitirPacienteDeEmergencia","AdmisionController","83",errorAlCrearAdmision!)

                const alas = await AlaService.getAlaFromDb();
                res.render("AdmisionViews/emergencia.pug", {
                    error: `${errorAlCrearAdmision}`,
                    alas: alas
                });
                return;
            }
            

            res.render("AdmisionViews/habitacion.pug", {
                success: "Paciente Admitido",
                habitacion: habitaciones[1][0]
            });
        } catch (error) {
            const alas = await AlaService.getAlaFromDb();
            res.status(500).render("AdmisionViews/emergencia.pug", {
                error: error instanceof Error ? error.message : "Error desconocido",
                alas: alas
            });
        }
    };

    public registrarPaciente = async(req:Request,res:Response) =>  {
       
            console.log(req.body);
            
        try {
            const [ error, createPacienteDto ] = CreatePacienteDto.create(req.body);
            if(error){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearPaciente","AdmisionController" ,"Line 24", error);
                
                throw new Error();
            }           

            const [ errorCrearPaciente, pacienteCreado ] = await PacienteServices.crearPaciente(createPacienteDto!);
            if(errorCrearPaciente){
                throw new Error(HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearPaciente","AdmisionController", "Line 31", errorCrearPaciente));
            }
            if(!pacienteCreado){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("registrarPaciente","AdmisionController","34","La bd no pudo crear el paciente")
                //res.status(500).render("error",{message: "El paciente ya existe"})
                return;
            }
            //res.status(200).render("confirmacion",{message: "Paciente creado"}); Enviar con render          


        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearPaciente","AdmisionController", "Line 30",error as string);
            //res.status(500).render("error",{message: "Error al registrar el paciente"})
            res.status(500).json({message: `${error}`})
        }

    }
    public buscarPacientePorDni = async(req:Request,res:Response)=> {

        try {
            const dniRecibido = req.params.dni ;
            if(!dniRecibido.trim()){
                res.status(404).json("Se requiere el dni")
            }
            const [errorDto, getPacienteDto] = GetPacienteDto.create(parseInt(dniRecibido));
            if(errorDto){
                // res.status(500).render("vista", {
                //     error:errorDto
                // })
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarPacientePorDni","AdmisionController","114",errorDto);
                res.status(403).json(errorDto)
            }
            const [errorBusqueda, pacienteEncontrado] = await PacienteServices.buscarPacienteExistente(getPacienteDto!.dni,1)
            if(!errorBusqueda){
                // res.status(404).render("vista",{
                //     error: "No se encontro el paciente"
                // })
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarPacientePorDni","AdmisionController","122","ERROR: No se encontro el paciente")
                res.status(404).json("ERROR: No se encontro el paciente")
            }
            res.status(200).json(pacienteEncontrado)

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarPacientePorDni","AdmisionController","128",error as string)
            res.status(500).json(error as string)
        }
    }
    public buscarTodaLaInformacionDelPaciente = async(req:Request,res:Response) => {

        try {
            const dniRecibido = req.params.dni ;
            const [errorDto, getPacienteDto] = GetPacienteDto.create(parseInt(dniRecibido));
            if(errorDto){
                // res.status(500).render("vista", {
                //     error:errorDto
                // })
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarTodaLaInformacionDelPaciente","AdmisionController","141",errorDto)
                res.status(403).json(errorDto)
            }
            const [errorBusqueda, pacienteEncontrado] = await PacienteServices.buscarPacienteExistente(getPacienteDto!.dni,1)
            if(!errorBusqueda){
                // res.status(404).render("vista",{
                //     error: "No se encontro el paciente"
                // })
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
            const [ error, updatePacienteDto] = UpdatePacienteDto.create(req.body);
            if(error){
                throw new Error(HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarPaciente","AdmisionController", "Line 53", error));
            }
            const [errorInService, confirmacion] = await PacienteServices.actualizarPaciente(updatePacienteDto!); 
            if(errorInService){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("ActualizarPaciente","AdmisionController","57",errorInService);    
                //Enviar con render  
                 //res.status(500).render("error",{message: "Error al actualizar el paciente"})//Enviar con render
            }
            if(confirmacion){
                //Enviar con render
                //res.status(200).render("success",{message: "Todo ok"})
            }

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarPaciente","AdmisionController", "Line 40", error as string);
            //res.status(500).render("error",{message: "Error al actualizar el paciente"})//Enviar con render
            
            return;            
        }
    }
    public getSeguroMedico = async(req:Request, res:Response) => {

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
    public registrarYAsignarSeguroMedico = async(req:Request,res:Response) => {

        try{
            console.clear();
            
            const [ error, createSeguroMedicoDto ] = CreateSeguroMedicoDto.create(req.body);
            if(error){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("registrarYAsignarSeguroMedico","AdmisionController", "Line 85", error);
                
                
                res.status(404).json(`${error}`)
                return
            }
            const [ errorCrearSeguroMedico, confirmacion ] = await SeguroMedicoService.createSeguroMedico(createSeguroMedicoDto!);
            if(errorCrearSeguroMedico && !confirmacion){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("registrarYAsignarSeguroMedico","AdmisionController", "Line 87", errorCrearSeguroMedico);
                //res.status(500).render("error",{message: "Error al registrar el seguro médico"})//Enviar con render
                res.status(500).json({messageError: errorCrearSeguroMedico})
                return;
            }
            if(confirmacion){
                const[errorAsignarSeguroMedico, confirmacionAsignar] = await PacienteServices.asignarSeguroMedico(createSeguroMedicoDto!.numero,createSeguroMedicoDto!.dni_Paciente);
                if(errorAsignarSeguroMedico && !confirmacionAsignar){
                    HelperForCreateErrors.errorInMethodXClassXLineXErrorX("registrarYAsignarSeguroMedico","AdmisionController", "Line 98", errorAsignarSeguroMedico);
                    //res.status(500).render("error",{message: "Error al asignar el seguro médico"})//Enviar con render
                    res.status(500).json({messageError: errorAsignarSeguroMedico})
                    return;
                }else{
                    res.status(200).json({message: "Todo ok, se le asigno el seguro medico al paciente"})
                }
            }
        }catch(error){
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("registrarYAsignarSeguroMedico","AdmisionController" ,"Line 105",(error as string));
            //res.status(500).render("error",{message: "Error al registrar el seguro médico"})//Enviar con render
            res.status(500).json({message: (error instanceof Error) ? error.message : "Unknown error"})
            
        }
    }
    public actualizarSeguroMedico = async(req:Request,res:Response) => {

        try {
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
    public getTodasLasAdmisiones = async(req:Request,res:Response) => {

        try {
            
            const [ errorDeBusqueda, admisiones ] = await AdmisionService.buscarTodasLasAdmisiones();
            if(errorDeBusqueda){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getTodasLasAdmisiones","AdmisionController","299",errorDeBusqueda)
                res.status(404).json(`${errorDeBusqueda}`)
            }
            res.status(200).json(admisiones)
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
    // public getHabitacionesByGender = async(req:Request,res:Response) => {
    //     try{
    //         const {ala,unidad,genero,motivo} = req.body;

    //     }catch(error){
    //         console.log(HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getHabitaciones","AdmisionController","Line 142",error as string));
    //         //res.status(500).render("error",{message: "Error al obtener las habitaciones"})//Enviar con render
    //     }
    // }


}
