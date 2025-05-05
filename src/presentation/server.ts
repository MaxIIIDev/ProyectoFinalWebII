
import express, { urlencoded } from "express";
import { AppRoutes } from "./routes";

import "dotenv/config"
import { Conexion } from "../data/conexion";


export class Server{

    private app = express(); 
    private morgan = require("morgan");
    private PORT = process.env.PORT

    public async start(){

        const routeStatic = __dirname.replace("presentation","public");
        
        const conexion = Conexion.getConexion;
        conexion.arrancarLaBd();
        
      
        this.app.use(express.urlencoded({extended:true}));
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
