import { Admision } from "../../data/models/Admision"
import { Hospital_alas } from "../../data/models/Hospital_alas";
import { Hospital_camas } from "../../data/models/Hospital_camas";
import { Hospital_habitaciones } from "../../data/models/Hospital_habitaciones";
import { motivo_De_Internacion } from "../../data/models/Motivo_De_Internacion";
import { Pacientes } from "../../data/models/Pacientes";
import { Prioridad_De_Atencion } from "../../data/models/Prioridad_De_Atencion";
import { tipo_De_Admision } from "../../data/models/tipo_de_Admision";
import { ActualizarAdmisionDto } from "../../domain/Dtos/admision/ActualizarAdmisionDTO";
import { CrearAdmisionDto } from "../../domain/Dtos/admision/CrearAdmisionDTO";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors"
import { CamaService } from "./Hospital/CamaService";



export class AdmisionService {

    public static getTiposDeAdmision = async():Promise<[string?,tipo_De_Admision[]?]> => {//!Programar
        try {
            const tiposDeAdmision: tipo_De_Admision[] = await tipo_De_Admision.findAll();
            if(!tipo_De_Admision) return ["No se obtuvo los registros de tiposDeAdmision", undefined]
            return [undefined, tiposDeAdmision]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getTiposDeAdmision","AdmisionService","22",error as string)
            return [error as string]
        }
    }
    public static actualizarAdmision = async(updateAdmisionDto: ActualizarAdmisionDto)=> {

        try {
            const admisionEncontrada = await this.buscarAdmisionVigentePorPaciente(updateAdmisionDto.id_Paciente!);
            if(admisionEncontrada[0]){
                return admisionEncontrada[0]
            }
            const [filasActualizadas] = await Admision.update(ActualizarAdmisionDto.toObject(updateAdmisionDto), {where: {
                id_Paciente: updateAdmisionDto.id_Paciente
                }}
            );
            if(filasActualizadas === 0){
                return ["No se actualizo la admision", false]
            }
            const confirmacionDeActualizacionDeCama = await CamaService.marcarCamaComoOcupada(updateAdmisionDto.id_Cama!)
            if(!confirmacionDeActualizacionDeCama[1]){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizar Admision", "Admision Service", "31", confirmacionDeActualizacionDeCama[0] as string)
            }
            return [ undefined, true];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizar Admision", "Admision Service", "31", error as string)
            return [undefined]
        }
    }
    public static crearAdmision = async(crearAdmisionDto: CrearAdmisionDto):Promise<[(string | undefined)?, (boolean | undefined)?, (Admision | undefined)?]> => {
        try {

            const [,admisionVigente] = await this.buscarAdmisionVigentePorPaciente(crearAdmisionDto.id_Paciente);
            if(admisionVigente){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearAdmision","AdmisionService","16","Ya hay una admision para dicho paciente activa")
                return["Ya hay una admision para dicho paciente activa"]
            }
            const admisionCreada = await Admision.create(CrearAdmisionDto.toObject(crearAdmisionDto))
            if(!admisionCreada) return ["No se creo la admision"]
             if(admisionCreada){ 
                 CamaService.marcarCamaComoOcupada(admisionCreada.dataValues.id_Cama) //todo: revisar
             }
            console.log("Se creo la admision" + admisionCreada.toJSON());
            return [ undefined,true,admisionCreada]
        } catch (error) {
            return [error as string,false]
        }
    }

    public static async buscarTodasLasAdmisiones(modo:number): Promise<[string?, Admision[]?]> {
        try {
            if(modo === 1){ //*modo 1 trae todas las admisiones
                const admisiones = await Admision.findAll({
                    include: [
                        {
                            model: Pacientes,
                            as: "pacientes"
                        },
                        {
                            model: Hospital_camas,
                            as: "camas"
                        },
                        {
                            model: motivo_De_Internacion,
                            as: "motivo_de_internacion"
                        },
                        {
                            model: Prioridad_De_Atencion,
                            as: "prioridad_de_atencion"
                        },
                        {
                            model: tipo_De_Admision,
                            as: "tipo_de_admision"
                        }                    
                    ], 
                    
                    });
                return [undefined, admisiones];
            }
            
            const admisiones = await Admision.findAll({ // *modo normal trae solo las admisiones activas	
                include: [
                    {
                        model: Pacientes,
                        as: "pacientes"
                    },
                    {
                        model: Hospital_camas,
                        as: "camas"
                    },
                    {
                        model: motivo_De_Internacion,
                        as: "motivo_de_internacion"
                    },
                    {
                        model: Prioridad_De_Atencion,
                        as: "prioridad_de_atencion"
                    },
                    {
                        model: tipo_De_Admision,
                        as: "tipo_de_admision"
                    }                    
                ], 
                where: { estado: "Activo" }
                 });

            if (admisiones.length === 0) {
                return ["No hay admisiones activas", undefined];
            }

            return [undefined, admisiones];
        } catch (error) {
            console.error("Error al buscar todas las admisiones:", error);
            return ["Error al buscar admisiones", undefined];
        }
    }
    public static  buscarAdmisionVigentePorPaciente = async(id_Paciente:number):Promise<[string?,Admision?]> => {//*Deberia funcionar
        try {
            const admisionEncontrada = await Admision.findOne(
                    {
                        
                        
                        where: { 
                            estado: "Activo",
                            id_Paciente: id_Paciente
                        }
                    }
                )
            if(!admisionEncontrada) return ["No hay admiciones activas para dicho paciente"]
            return [undefined, admisionEncontrada]
        } catch (error) {
            return [error as string]
        }
    }
    public static bajaLogicaAdmision = async(id_Admision:number):Promise<[string?,boolean?]> => {
        try {
            const admisionEncontrada = await Admision.findOne({where:{
                id_Admision: id_Admision
            }})
            if(!admisionEncontrada) return ["No se encontro la admision"]
            const admisionBaja = await Admision.update({estado: "Inactivo"},{where:{id_Admision: id_Admision}})
            if(!admisionBaja) return ["No se pudo dar de baja la admision"]
            const seDioBajaLogica = await CamaService.marcarCamaComoLibre(admisionEncontrada.dataValues.id_Cama)
            if(!seDioBajaLogica[1]) return ["No se pudo marcar libre la cama",seDioBajaLogica[1]]
            return [undefined,true]
        } catch (error) {
            return [error as string]
        }
    }
    public static altaLogicaAdmision = async(id_Admision:number):Promise<[string?,boolean?]> => {
        try {
            const admisionEncontrada = await Admision.findOne({where:{
                id_Admision: id_Admision
            }})
            if(!admisionEncontrada) return ["No se encontro la admision"]
            const admisionBaja = await Admision.update({estado: "Activo"},{where:{id_Admision: id_Admision}})
            if(!admisionBaja) return ["No se pudo dar de alta la admision"]
            const seDioBajaLogica = await CamaService.marcarCamaComoOcupada(admisionEncontrada.dataValues.id_Cama)
            if(!seDioBajaLogica[1]) return ["No se pudo marcar ocupada la cama",seDioBajaLogica[1]]
            return [undefined,true]
        } catch (error) {
            return [error as string]
        }
    }
    
}