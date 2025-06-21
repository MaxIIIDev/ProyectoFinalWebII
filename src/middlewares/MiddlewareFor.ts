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
}