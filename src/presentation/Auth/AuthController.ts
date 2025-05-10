import { Request, Response } from "express";

import { Conexion } from "../../data/conexion";

import { Sequelize } from "sequelize-typescript";







export class AuthController{

    constructor(){}

    public Login = async (req:Request,res:Response) => {
        try {
            
            
            
           
            res.render("./home/login");
            
        } catch (error) {
            console.log("hubo un error: " + error);
            
        }
        
        

        

    }

}
