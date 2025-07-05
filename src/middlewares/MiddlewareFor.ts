import { NextFunction, Request, Response } from "express"
import { HelperForCreateErrors } from "../Helpers/HelperForCreateErrors"

export class MiddlewareFor {

    static AuthSession = (rol:string) => {
        return (req:Request,res:Response,next:NextFunction) => {

            try {
                if(!req.session.usuarioLogueado){
                    res.redirect(`/auth/login?warning=${encodeURIComponent("Se cerró la sesion")}`)
                    return
                }
                if(req.session.usuarioLogueado.nombre_Rol !== rol){
                    res.redirect(`/auth/login?warning=${encodeURIComponent("No tienes permiso para acceder a esta ruta")}`)
                    return
                }
                next();
                return
            } catch (error) {
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("AuthForRole","MiddlewareFor","9",error as string)
                res.redirect(`/auth/login?error=${encodeURIComponent(error)}`)
                return
            }
        }
    }
    static InicializarSessionEnfermero = (req:Request,res:Response,next:NextFunction) => {
        try {
            req.session.usuarioLogueado= {
                id_Cuenta: 4,
                id_Personal: 1,
                email: "enfermero1@gmail.com",
                nombre: "Carlos",
                apellido: "López",
                dni: 25678901,
                logged: true,
                id_Rol: 3,
                nombre_Rol: "Enfermero",
                id_Especialidad:null
            }
            next();
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("InicializarSessionEnfermero","MiddlewareFor","16",error as string)
            return 
        }
    }
    static verificarSessionPaciente = (ruta:string,tipoDeAdvertencia:string,mensaje:string)=> (req:Request,res:Response,next:NextFunction) => {
        try {
            if(!req.session.paciente){
                res.redirect(`${ruta}?${tipoDeAdvertencia}=${encodeURIComponent(mensaje)}`)
                return
            }
            next();
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("verificarSessionPaciente","MiddlewareFor","51",error as string)
            res.redirect(`${ruta}?error=${encodeURIComponent(error as string)}`);
            return
        }
    }
    static verificarPacienteNoDesconocido = (ruta:string,tipoDeAdvertencia:string,mensaje:string)=> (req:Request,res:Response,next:NextFunction) => {
        try {
            if(!req.session.paciente.dni || req.session.paciente.dni < 0 || req.session.paciente.dni === undefined){
                res.redirect(`${ruta}?${tipoDeAdvertencia}=${encodeURIComponent(mensaje)}`)
                return
            }
            next();
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("verificarPacienteNoDesconocido","MiddlewareFor","59",error as string)
            res.redirect(`${ruta}?error=${encodeURIComponent(error as string)}`);
            return
        }
    }
    static verificarSessionAdmision = (ruta:string,tipoDeAdvertencia:string,mensaje:string)=> (req:Request,res:Response,next:NextFunction) => {
        try {
            if(!req.session.admision){
                res.redirect(`${ruta}?${tipoDeAdvertencia}=${encodeURIComponent(mensaje)}`)
                return
            }
            next();
            return
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("verificarSessionAdmision","MiddlewareFor","73",error as string)
            res.redirect(`${ruta}?error=${encodeURIComponent(error as string)}`);
            return
        }
    }
}