import { Request, Response } from "express";

import { Conexion } from "../../data/conexion";

import { Sequelize } from "sequelize-typescript";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";
import { AuthServices } from "../services/auth/AuthServices";


export class AuthController{

    
    constructor(){}

    public viewLogin = (req:Request,res:Response) =>{

        try {
            const error = req.query.error || undefined;
            const warning = req.query.warning || undefined;
            if(error){
                res.render("./home/login",{
                    error: error
                })
                return
            }
            if(warning){
                res.render("./home/login", {
                    warning: warning
                })
                return
            }
            res.render("./home/login");
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("viewLogin","AuthController","18",error as string)
            res.render("./home/login", {
                error : error as string
            });
            return
        }

    }

    public Login = async (req:Request,res:Response) => { //*TESTEADO, funciona, hay que agregar la navegabilidad y las redirecciones
        try {
            
            const {email, password} = req.body;
            if(!email || !password || password.length < 6){
                res.render("./home/login", {
                error : "Se requiere email y contraseña( > 6 digitos)"
                })
                return
            }
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if (!passwordRegex.test(password)) {
                res.render("./home/login",{
                    error: "La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, un número y un carácter especial."
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

            
            type sesionLogueo = {
                id_Cuenta: number,
                id_Personal: number,
                email:string,
                nombre: string,
                apellido: string,
                dni: number,
                logged: boolean,
                id_Rol : number,
                nombre_Rol: string,
                id_Especialidad: number
            }
            const rol = (usuarioAutenticado.dataValues.rol.dataValues.nombre == "Admision") ? "personal_de_admision" : usuarioAutenticado.dataValues.rol.dataValues.nombre
            console.log(usuarioAutenticado.dataValues.id_Usuario);
            console.log(usuarioAutenticado.dataValues[rol.toLowerCase()].dataValues[`id_${rol}`]);
            console.log(usuarioAutenticado.dataValues.email);
            console.log(usuarioAutenticado.dataValues[(rol).toLowerCase()].dataValues.nombre);
            console.log(usuarioAutenticado.dataValues[(rol).toLowerCase()].dataValues.apellido);
            console.log(usuarioAutenticado.dataValues[(rol).toLowerCase()].dataValues.dni);
            console.log(usuarioAutenticado.dataValues.rol.dataValues.id_Rol);
            console.log(usuarioAutenticado.dataValues.rol.dataValues.nombre);
            console.log(rol);
            
            
            console.log((usuarioAutenticado.dataValues.medico) ? usuarioAutenticado.dataValues.medico.dataValues.id_Especialidad :null);
            
            
            const objSession: sesionLogueo = {
                id_Cuenta: usuarioAutenticado.dataValues.id_Usuario,
                id_Personal: usuarioAutenticado.dataValues[rol.toLowerCase()].dataValues[`id_${rol}`],
                email: usuarioAutenticado.dataValues.email,
                nombre: usuarioAutenticado.dataValues[(rol).toLowerCase()].dataValues.nombre,
                apellido: usuarioAutenticado.dataValues[(rol).toLowerCase()].dataValues.apellido,
                dni: usuarioAutenticado.dataValues[(rol).toLowerCase()].dataValues.dni,
                logged: true,
                id_Rol: usuarioAutenticado.dataValues.rol.dataValues.id_Rol,
                nombre_Rol: usuarioAutenticado.dataValues.rol.dataValues.nombre,
                id_Especialidad: (usuarioAutenticado.dataValues.medico) ? usuarioAutenticado.dataValues.medico.dataValues.id_Especialidad :null
            }
            req.session.usuarioLogueado = objSession; //todo: Ver si funciona

            res.redirect(`/${encodeURIComponent(usuarioAutenticado.dataValues.rol.dataValues.nombre)}`)
            console.log("Se logueo correctamente");
            
            return
            
            //!Completar navegabilidad, y ver lo de middlewares.
      
            //!4- Navegabilidad en cuanto a roles
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
                res.status(404).json({error: "Se requiere email, contraseña(>8), id_Rol"})
                return
            }
            //!5- COMPLETAR LA INSCRIPCION
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("SignUp","AuthController","80",error as string)
            res.status(500).json({error: error as string})
            //todo: Logica para redireccionar o informar que ocurrio un error durante el registro
            return
        }
    }

    public test = async(req:Request, res:Response) => {
        try {
            const[ errorCuenta, cuenta, contraseña ] = await AuthServices.crearContraseña("Admision1@");
            if(errorCuenta) {
                res.json({errorCuenta: errorCuenta})
                return
            }
            
            res.json({ contraseña: contraseña})
            
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("test","authController","81",error as string)
            res.status(500).json({error: error})
            return 
        }
    }
}
