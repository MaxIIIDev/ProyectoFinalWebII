import { Admision } from "../../data/models/admision"
import { Pacientes } from "../../data/models/pacientes";
import { CrearAdmisionDto } from "../../domain/Dtos/admision/crearAdmisionDTO";
import { GetAdmisionPorPacienteDTO } from "../../domain/Dtos/admision/getAdmisionPorPacienteDTO";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors"



export class AdmisionService {


    public static crearAdmision = async(crearAdmisionDto: CrearAdmisionDto):Promise<[(string | undefined)?, (boolean | undefined)?, (Admision | undefined)?]> => {
        try {

            const [,admisionVigente] = await this.buscarAdmisionVigentePorPaciente(crearAdmisionDto.id_Paciente);
            if(admisionVigente){
                HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearAdmision","AdmisionService","16","Ya hay una admision para dicho paciente activa")
                return["Ya hay una admision para dicho paciente activa"]
            }
            const admisionCreada = await Admision.create(CrearAdmisionDto.toObject(crearAdmisionDto))
            if(!admisionCreada) return ["No se creo la admision"]
            console.log("Se creo la admision" + admisionCreada.toJSON());
            return [ undefined,true,admisionCreada]
        } catch (error) {
            return [error as string,false]
        }
    }

    public static async buscarTodasLasAdmisiones(): Promise<[string?, Admision[]?]> {
        try {
            const admisiones = await Admision.findAll({
                include: [
                    {
                        model: Pacientes,
                        as: "pacientes"
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
    public static  buscarAdmisionVigentePorPaciente = async(id_Paciente:number):Promise<[string?,Admision?]> => {
        try {
            const admisionEncontrada = await Admision.findOne({where:{
                estado: "Activo",
                id_Paciente: id_Paciente
            }})
            if(!admisionEncontrada) return ["No hay admiciones activas para dicho paciente"]
            return [undefined, admisionEncontrada]
        } catch (error) {
            return [error as string]
        }
    }
}