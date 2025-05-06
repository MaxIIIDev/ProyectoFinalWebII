import { Request, Response } from "express";
import { Conexion } from "../../data/conexion";
import { CreatePacienteDto } from "../../domain/Dtos/pacientes/createPacienteDto";
import { Pacientes } from "../../data/models/pacientes";
import { PacienteServices } from "../services/PacientesService";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";
import { UpdatePacienteDto } from "../../domain/Dtos/pacientes/updatePacienteDto";
import { config } from "dotenv";

export class AdmisionController{
    private conexionBd: Conexion;
    public constructor(conexionbd: Conexion){
        this.conexionBd = conexionbd;
    }
    public registrarPaciente = async(req:Request,res:Response) =>  {
       
        try {
            
            const [ error, createPacienteDto ] = CreatePacienteDto.create(req.body);
            if(error){
                throw new Error(HelperForCreateErrors.errorInMethodXLineXErrorX("crearPaciente", "Line 20", error));
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
        


    

}
