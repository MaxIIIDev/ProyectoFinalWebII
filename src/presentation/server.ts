
import express from "express";
import { AppRoutes } from "./routes";
import { PORT } from "../config/constantes";

export class Server{

    private app = express(); 
    private morgan = require("morgan");

    async start(){

        const routeStatic = __dirname.replace("presentation","public");
        console.log(routeStatic);
        
        this.app.set("views", "./src/public/views");
        this.app.set("view engine" , "pug");
        this.app.use(express.static(routeStatic));
        this.app.use(this.morgan("dev"))
        this.app.use(AppRoutes.routes);

        this.app.listen(PORT, () => {
            console.log("Server on");

        });
    }


}
