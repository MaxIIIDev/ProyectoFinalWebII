import { Request, Response } from "express";
import { Conexion } from "../../data/conexion";

export class AdmisionController{
    private conexionBd: Conexion;
    public constructor(conexionbd: Conexion){
        this.conexionBd = conexionbd;
    }
    public crearPaciente = (req:Request,res:Response) =>  {
       
        const {} = req.body;
        
        


    }
        


    

}
