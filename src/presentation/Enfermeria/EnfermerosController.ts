import { Request, Response } from "express";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";


export class EnfermerosController{

    
    public getEnfermeros = (req:Request,res:Response):void => {
        res.send("hola estas en el metodo get enfermeros");
    }

    public test = (req:Request,res:Response):void =>{
        try {
            
            

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("test","EnfermeroController","",error as string)
            res.status(500).json({messageError: error})
            return
        }
    }
}
