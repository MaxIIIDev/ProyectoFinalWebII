
import express, { urlencoded } from "express";
import { AppRoutes } from "./routes";

import "dotenv/config"
import { Conexion } from "../data/conexion";
import { Pacientes } from "../data/models/pacientes";

declare module "express-session" {
    interface SessionData {
        paciente: {
            id_Paciente: number,
            nombre: string,
            apellido: string,
            dni: string,
            fecha_nac: string,
            edad: number,
            peso: number,
            genero: string,
            telefono: string,
            telefono_emergencia: string,
            id_tipo_sanguineo: number,
            id_seguro_medico: number,
        }
    }
}
export class Server{

    private app = express(); 
    private morgan = require("morgan");
    private PORT = process.env.PORT
    private session = require("express-session");
    public async start(){

        const routeStatic = __dirname.replace("presentation","public");
        
        const conexion = Conexion.getConexion;
        conexion.arrancarLaBd();


        
        this.app.use(this.session({
            secret: "122",
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,
                maxAge: 1000 * 60 * 60 * 8 // 1 day
            }
        }));
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(express.json())
        this.app.use(express.static(routeStatic));

        this.app.use("/icons", express.static(`${__dirname}/../../node_modules/bootstrap-icons/font`))
        this.app.use(this.morgan("dev"))
        this.app.set("views", "./src/public/views");
        this.app.set("view engine" , "pug");
       
        this.app.use(AppRoutes.routes);
        
        this.app.listen(this.PORT, () => {
            console.log("Server on! PORT: "+ process.env.PORT);

        });
    }


}
