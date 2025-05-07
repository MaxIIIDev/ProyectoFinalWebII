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
    public registrarPaciente = async(req:Request,res:Response) =>  {
       
            console.log(req.body);
            
        try {
            const [ error, createPacienteDto ] = CreatePacienteDto.create(req.body);
            if(error){
                console.log(HelperForCreateErrors.errorInMethodXLineXErrorX("crearPaciente", "Line 20", error));
                
                throw new Error();
            }           

            const [ errorCrearPaciente, pacienteCreado ] = await PacienteServices.crearPaciente(createPacienteDto!);
            if(errorCrearPaciente){
                throw new Error(HelperForCreateErrors.errorInMethodXLineXErrorX("crearPaciente", "Line 25", errorCrearPaciente));
            }
            if(!pacienteCreado){
                HelperForCreateErrors.errorInMethodXLineXErrorX("registrarPaciente","15","La bd no pudo crear el paciente")
                //res.status(500).render("error",{message: "El paciente ya existe"})
                return;
            }
            //res.status(200).render("confirmacion",{message: "Paciente creado"}); Enviar con render          


        } catch (error) {
            console.log(HelperForCreateErrors.errorInMethodXLineX("crearPaciente", "Line 30"));
            //res.status(500).render("error",{message: "Error al registrar el paciente"})
            res.status(500).json({message: `${error}`})
        }

    }
    public actualizarPaciente = async(req:Request,res:Response) =>  {

        try {
            const [ error, updatePacienteDto] = UpdatePacienteDto.create(req.body);
            if(error){
                throw new Error(HelperForCreateErrors.errorInMethodXLineXErrorX("actualizarPaciente", "Line 40", error));
            }
            const [errorInService, confirmacion] = await PacienteServices.actualizarPaciente(updatePacienteDto!); 
            if(errorInService){
                console.log(HelperForCreateErrors.errorInMethodXLineXErrorX("ActualizarPaciente","40",errorInService));    
                //Enviar con render  
                 //res.status(500).render("error",{message: "Error al actualizar el paciente"})//Enviar con render
            }
            if(confirmacion){
                //Enviar con render
                //res.status(200).render("success",{message: "Todo ok"})
            }

        } catch (error) {
            console.log(HelperForCreateErrors.errorInMethodXLineX("actualizarPaciente", "Line 40"));
            //res.status(500).render("error",{message: "Error al actualizar el paciente"})//Enviar con render
            
            return;            
        }
    }
    public registrarYAsignarSeguroMedico = async(req:Request,res:Response) => {

        try{
            const [ error, createSeguroMedicoDto ] = CreateSeguroMedicoDto.create(req.body);
            if(error){
                console.log(HelperForCreateErrors.errorInMethodXLineXErrorX("registrarSeguroMedico", "Line 71", error));
                throw new Error();
            }
            const [ errorCrearSeguroMedico, confirmacion ] = await SeguroMedicoService.createSeguroMedico(createSeguroMedicoDto!);
            if(errorCrearSeguroMedico && !confirmacion){
                console.log(HelperForCreateErrors.errorInMethodXLineXErrorX("registrarSeguroMedico", "Line 75", errorCrearSeguroMedico));
                //res.status(500).render("error",{message: "Error al registrar el seguro médico"})//Enviar con render
                return;
            }
            if(confirmacion){
                const[errorAsignarSeguroMedico, confirmacionAsignar] = await PacienteServices.asignarSeguroMedico(createSeguroMedicoDto!.numero,createSeguroMedicoDto!.dni_Paciente);
                if(errorAsignarSeguroMedico && !confirmacionAsignar){
                    console.log(HelperForCreateErrors.errorInMethodXLineXErrorX("registrarYAsignarSeguroMedico", "Line 90", errorAsignarSeguroMedico));
                    //res.status(500).render("error",{message: "Error al asignar el seguro médico"})//Enviar con render
                    return;
                }
            }
        }catch(error){
            console.log(HelperForCreateErrors.errorInMethodXLineXErrorX("registrarYAsignarSeguroMedico", "Line 95",(error as string)));
            //res.status(500).render("error",{message: "Error al registrar el seguro médico"})//Enviar con render
            
            return;
        }
    }
    public actualizarSeguroMedico = async(req:Request,res:Response) => {

        try {
            const[ error, updateSeguroMedicoDto] = UpdateSeguroMedicoDto.create(req.body);

            if(error){
                console.log(HelperForCreateErrors.errorInMethodXLineXErrorX("actualizarSeguroMedico", "Line 105", error));
                //res.status(500).render("error",{message: "Error al actualizar el seguro médico"})//Enviar con render
                return;
            }
            const [errorInService, confirmacion] = await SeguroMedicoService.updateSeguroMedico(updateSeguroMedicoDto!);
            if(errorInService && !confirmacion){
                console.log(HelperForCreateErrors.errorInMethodXLineXErrorX("actualizarSeguroMedico", "Line 110", errorInService));
                //res.status(500).render("error",{message: "Error al actualizar el seguro médico"})//Enviar con render
                return;
            }
            console.log("Seguro médico actualizado: " + updateSeguroMedicoDto);
            
        } catch (error) {
            console.log(HelperForCreateErrors.errorInMethodXLineXErrorX("actualizarSeguroMedico", "Line 115",error as string));
            
        }

    }
    


    

}
