import { Request, Response } from "express";
import { Conexion } from "../../data/conexion";
import { CreatePacienteDto } from "../../domain/Dtos/pacientes/createPacienteDto";
import { PacienteServices } from "../services/PacientesService";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";
import { UpdatePacienteDto } from "../../domain/Dtos/pacientes/updatePacienteDto";
import { CreateSeguroMedicoDto } from "../../domain/Dtos/SeguroMedico/createSeguroMedicoDto";
import { SeguroMedicoService } from "../services/SeguroMedicoService";
import { UpdateSeguroMedicoDto } from "../../domain/Dtos/SeguroMedico/updateSeguroMedicoDto";


export class AdmisionController{
    private conexionBd: Conexion;
    public constructor(conexionbd: Conexion){
        this.conexionBd = conexionbd;
    }

    public vistaPrincipal = async(req: Request, res:Response)=> {
        res.render("AdmisionViews/principal.pug");
    }

    public vistaEmergencia = async(req:Request, res:Response)=> {
        res.render("AdmisionViews/emergencia.pug")
    }

    public vistaEmergenciaHabitacion = (req:Request, res:Response)=> {
        res.render("AdmisionViews/habitacion.pug")
    }

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
    public registrarYAsignarSeguroMedico = async(req:Request,res:Response) => {

        try{
            console.clear();
            if(!req.body){
                throw new Error("Atributos incorrectos en body")
            }
            const [ error, createSeguroMedicoDto ] = CreateSeguroMedicoDto.create(req.body);
            if(error){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("registrarYAsignarSeguroMedico","AdmisionController", "Line 85", error);
                throw new Error();
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
                //res.status(500).render("error",{message: "Error al actualizar el seguro médico"})//Enviar con render
                throw Error(error);
            }
            const [errorInService, confirmacion] = await SeguroMedicoService.updateSeguroMedico(updateSeguroMedicoDto!);
            if(errorInService && !confirmacion){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarSeguroMedico","AdmisionController", "Line 123", errorInService);
                //res.status(500).render("error",{message: "Error al actualizar el seguro médico"})//Enviar con render
                throw Error(error);
            }
            console.log("Seguro médico actualizado: " + updateSeguroMedicoDto);
            res.status(200).json({message: "Seguro medico actualizado"})
            
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarSeguroMedico","AdmisionController", "Line 130",error as string);
            res.status(500).json({messageError: error instanceof Error ? error.message : "error desconocido"})
        }

    }
    
    public getHabitaciones = async(req:Request,res:Response) => {
        try{
            const genero = req.params.genero;
            

            

        }catch(error){
            console.log(HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getHabitaciones","AdmisionController","Line 142",error as string));
            //res.status(500).render("error",{message: "Error al obtener las habitaciones"})//Enviar con render
        }


    }

}
