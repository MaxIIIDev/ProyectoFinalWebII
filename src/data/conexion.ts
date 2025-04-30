import { Sequelize } from "sequelize";
import { config } from "../config/config";



export class Conexion{
    
    private static conexion: Conexion;
    private sequelize: Sequelize;

    private constructor(){
        this.sequelize = new Sequelize(config.development.database,config.development.username, config.development.password,{
            host: config.development.host,
            dialect: config.development.dialect,
            port: config.development.port
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

}