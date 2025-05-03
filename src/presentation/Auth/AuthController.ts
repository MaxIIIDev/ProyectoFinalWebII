import { Request, Response } from "express";


export class AuthController{

    constructor(){}

    public Login = (req:Request,res:Response) => {

        const { email, password } = req.body;
        console.log("email: " ,  email);
        console.log("contraseña: ", password );
        console.log(req.body);
        

        

    }

}
