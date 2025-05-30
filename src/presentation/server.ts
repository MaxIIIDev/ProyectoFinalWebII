
import express, { urlencoded } from "express";
import { AppRoutes } from "./routes";
import fs from "fs";
import "dotenv/config"
import { Conexion } from "../data/conexion";
import { Pacientes } from "../data/models/Pacientes";
import path from "path";

declare module "express-session" {
    interface SessionData {
        paciente: {
            id_Paciente: number,
            nombre: string,
            apellido: string,
            dni: number,
            fecha_nac: string,
            edad: number,
            peso: number,
            genero: string,
            telefono: string,
            telefono_emergencia: string,
            direccion: string,
            id_tipo_sanguineo: number,
            id_seguro_medico: number,
        },
        admision: {
            id_Admision: number,
            estado: string,
            id_motivo_de_Internacion: number,
            id_prioridad_de_atencion: number,
            id_tipo_de_admision: number,
            fecha_De_Admision: Date,
            id_Paciente: number,
            id_Cama: number
        },
        restosAdmision: {
            nombre_ala: string
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
                maxAge: 1000 * 60 * 60 * 24 // 1 day
            }
        }));
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(express.json())
        this.app.use(express.static(routeStatic));

        this.app.use("/icons", express.static(`${__dirname}/../../node_modules/bootstrap-icons/font`))
        this.app.use(this.morgan("dev"))
        //this.configureViews();
         this.app.set("views", "./src/public/views");
         this.app.set("view engine" , "pug");
       
        this.app.use(AppRoutes.routes);
        
        this.app.listen(this.PORT, () => {
            console.log("Server on! PORT: "+ process.env.PORT);

        });
    }
    // private configureViews() {
    //     // Posibles ubicaciones de las vistas
    //     const possibleViewPaths = [
    //         path.join(__dirname, "../public/views"),       // Desarrollo local
    //         path.join(__dirname, "../../public/views"),    // Producción en algunos entornos
    //         path.join(process.cwd(), "src/public/views"),   // Producción en Render.com
    //         path.join(process.cwd(), "public/views")        // Producción alternativa
    //     ];

    //     // Filtrar solo las rutas que existen
    //     const validViewPaths = possibleViewPaths.filter(viewPath => {
    //         try {
    //             return fs.existsSync(viewPath);
    //         } catch (error) {
    //             return false;
    //         }
    //     });

    //     if (validViewPaths.length === 0) {
    //         throw new Error("No se encontró el directorio de vistas en ninguna de las ubicaciones probadas");
    //     }

    //     console.log("Configurando vistas en:", validViewPaths);
    //     this.app.set("views", validViewPaths);
    //     this.app.set("view engine", "pug");

    //     // Middleware para verificar rutas de vistas
    //     this.app.use((req, res, next) => {
    //         res.locals.viewPaths = validViewPaths;
    //         next();
    //     });
    // }

}
