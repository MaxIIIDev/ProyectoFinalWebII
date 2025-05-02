
import express from "express";
import { AppRoutes } from "./routes";

import "dotenv/config"

export class Server{

    private app = express(); 
    private morgan = require("morgan");
    private PORT = process.env.PORT

    public async start(){

        const routeStatic = __dirname.replace("presentation","public");
        const dotenv = require("dotenv");

        this.app.set("view engine" , "pug");
        
        this.app.set("views", "./src/public/views");
        
        this.app.use(express.static(routeStatic));
        this.app.use(this.morgan("dev"))
        this.app.use(AppRoutes.routes);
        
        this.app.listen(this.PORT, () => {
            console.log("Server on! PORT: "+ process.env.PORT);

        });
    }


}
