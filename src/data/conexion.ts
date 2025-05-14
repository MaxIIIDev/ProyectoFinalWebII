import { Sequelize } from "sequelize-typescript";
import { config } from "../config/config";
import { importaciones } from "./models/init";
import { seedDatabase } from "./seed";




export class Conexion{
    
    private static conexion: Conexion;
    private sequelize: Sequelize;

    private constructor(){
        this.sequelize = new Sequelize(
            config.development.database,
            config.development.username, 
            config.development.password,{
            host: config.development.host,
            dialect: config.development.dialect,
            port: config.development.port,
            models: importaciones
        });
    }


    static get getConexion(): Conexion{

        if(!Conexion.conexion){
            Conexion.conexion = new Conexion();
            
        }

        return Conexion.conexion;

    }

    public getSequelize():Sequelize{
        return this.sequelize;
    }

    public async authenticated(): Promise<void>{

        try {
            await this.sequelize.authenticate();
            console.log("Conexion exitosa con la bd");
            
        } catch (error) {
            console.log("No se pudo establecer la conexion con la bd");
            console.log(error);
            
        }

    }
    public async cerrarConexion(): Promise<void>{

        try {
            await this.sequelize.close();
            
            console.log("La conexion con la bd fue cerrada");
            
        } catch (error) {
            console.log("Hubo un error al cerrar la conexion con la bd");
            
        }

    }
    public async sync() {
        try{
            await Conexion.getConexion.getSequelize().sync({
                force:false,
                alter: true
            });
            console.log("sincronizado");
            
        }catch(error){
            console.log("error de sincronizacion: " +error);
            
        }
    }
    public async runSeed(){

        try{

            await seedDatabase();
            console.log("Seeds ejecutados correctamente");
            

        }catch(error){
            console.error("Error al ejecutar los seeds: " , error)
        }

    }

    public async arrancarLaBd(){

        await this.authenticated();
       // await this.sync()
       // await this.runSeed()

    }
}