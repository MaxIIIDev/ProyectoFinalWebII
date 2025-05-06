import { Request, Response } from "express";
import { Conexion } from "../../data/conexion";
import { CreatePacienteDto } from "../../domain/Dtos/pacientes/createPacienteDto";
import { Pacientes } from "../../data/models/pacientes";
import { PacienteServices } from "../services/PacientesService";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";

export class AdmisionController{
    private conexionBd: Conexion;
    public constructor(conexionbd: Conexion){
        this.conexionBd = conexionbd;
    }
    public crearPaciente = async(req:Request,res:Response) =>  {
       
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
                res.status(400).json({error: "El paciente ya existe"});
                return;
            }
            res.status(200).json({message: "Paciente creado"});           


        } catch (error) {
            console.log(HelperForCreateErrors.errorInMethodXLineX("crearPaciente", "Line 30"));
            res.status(500)
        }
        
        


    }
        


    

}
