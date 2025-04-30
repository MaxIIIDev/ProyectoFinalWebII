import { Request, Response } from "express";
import { Conexion } from "../../data/conexion";


export class AdmisionController{
    private conexionBd: Conexion;
    public constructor(conexionbd: Conexion){
        this.conexionBd = conexionbd;
    }
    public admitir = (req:Request,res:Response)=> {
       
        res.render("prueba");

    }
        


    

}
