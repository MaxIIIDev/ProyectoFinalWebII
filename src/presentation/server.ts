
import express from "express";
import { AppRoutes } from "./routes";

export class Server{

    private app = express(); 


    async start(){

        const routeStatic = __dirname.replace("presentation","public");
        console.log(routeStatic);
        
        this.app.set("views", "./src/public/views");
        this.app.set("view engine" , "pug");
        this.app.use(express.static(routeStatic));
        
        this.app.use(AppRoutes.routes);

        this.app.listen(8080, () => {
            console.log("Server on");

        });
    }


}
