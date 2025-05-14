import { Admision } from "../../data/models/admision"
import { GetAdmisionPorPacienteDTO } from "../../domain/Dtos/admision/getAdmisionPorPacienteDTO";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors"



export class AdmisionService {


    // static crearAdmision = async()=> {



    // }

    public static async buscarTodasLasAdmisiones(): Promise<[string?, Admision[]?]> {
        try {
            const admisiones = await Admision.findAll({ where: { estado: "Activo" } });

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