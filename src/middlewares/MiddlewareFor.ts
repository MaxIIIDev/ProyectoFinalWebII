import { NextFunction, Request, Response } from "express"
import { HelperForCreateErrors } from "../Helpers/HelperForCreateErrors"

export class MiddlewareFor {

    static AuthSession = () => {
        return (req:Request,res:Response,next:NextFunction) => {

            try {
                if(!req.session.usuarioLogueado){
                    res.redirect(`/auth/login?warning=${encodeURIComponent("Se cerró la sesion")}`)
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
}