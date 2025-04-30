import { Request, Response } from "express";


export class EnfermerosController{

    public getEnfermeros = (req:Request,res:Response):void => {
        res.send("hola estas en el metodo get enfermeros");
    }

}
