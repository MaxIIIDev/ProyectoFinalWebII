import { HelperForCreateErrors } from "../../../Helpers/HelperForCreateErrors"
import { Especialidades } from "../../../data/models/Especialidades"
import { Medicos } from "../../../data/models/Medicos"
import { Paciente_Diagnosticos } from "../../../data/models/Paciente_Diagnosticos"
import { Tipo_De_Diagnostico } from "../../../data/models/Tipo_De_Diagnostico"
import { paciente_tratamientos } from "../../../data/models/paciente_tratamientos"
import { PacienteServices } from "../PacientesService"

export class DiagnosticoService{
 
    public static async buscarDiagnosticosPorPaciente(id_Paciente: number):Promise<[string?, Paciente_Diagnosticos[]?]>{
        try {
            if(!id_Paciente || id_Paciente < 0) return ["id_Paciente no puede ser nulo o menor a 0", undefined]
            if(!await PacienteServices.getPacienteById(id_Paciente).then(res=> res[1])){
                return ["No se ha encontrado registrado el paciente", undefined]
            }
            const diagnosticosDelPaciente = await Paciente_Diagnosticos.findAll({
                where: {
                    id_paciente: id_Paciente
                },
                include:[
                    {
                        model: Medicos,
                        as: "medico",
                        attributes: ["nombre", "apellido"],
                        include: [
                            {
                                model: Especialidades,
                                as: "especialidad",
                                attributes: ["nombre"]
                            }
                        ]
                    },
                    {
                        model: Tipo_De_Diagnostico,
                        as: "tipo_de_diagnostico",
                        attributes: ["nombre"]
                    },
                    {
                        model: paciente_tratamientos,
                        as: "tratamiento",
                        attributes: ["detalle"]
                    }
                ]
            })
            if(!diagnosticosDelPaciente) return ["El paciente no tiene diagnosticos registrados", undefined]
            return [undefined, diagnosticosDelPaciente]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarDiagnosticosPorPaciente","DiagnosticoService","9",error as string)
            return [error as string ,undefined]
        }
    }
}