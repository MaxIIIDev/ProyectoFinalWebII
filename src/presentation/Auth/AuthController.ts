import { Request, Response } from "express";

import { Conexion } from "../../data/conexion";

import { Sequelize } from "sequelize-typescript";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";
import { AuthServices } from "../services/auth/AuthServices";


export class AuthController{

    
    constructor(){}

    public viewLogin = (req:Request,res:Response) =>{

        try {
            res.render("./home/login");
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("viewLogin","AuthController","18",error as string)
            res.render("./home/login", {
                error : error as string
            });
            return
        }

    }

    public Login = async (req:Request,res:Response) => {
        try {
            
            const {email, password} = req.body;
            if(!email || !password || password.length < 6){
                res.render("./home/login", {
                error : "Se requiere email y contraseña( > 6 digitos)"
                })
                return
            }
            const [ errorAuthService, usuarioAutenticado] = await AuthServices.login(email,password);
            if(errorAuthService){
                res.render("./home/login", {
                error : `${errorAuthService}`
                })
                return
            }

            
        } catch (error) {
            res.render("./home/login", {
                error : error as string
            });
            return 
        }

    }
    public SignUp = async (req:Request, res:Response) => {
        try {
            
            const {email, contraseña, id_Rol} = req.body;
            if(!email || !contraseña || contraseña.length < 6 || !id_Rol){
                res.status(404).json({error: "Se requiere email, contraseña(>6), id_Rol"})
                return
            }
            
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("SignUp","AuthController","80",error as string)
            res.status(500).json({error: error as string})
            //todo: Logica para redireccionar o informar que ocurrio un error durante el registro
            return
        }
    }

}
