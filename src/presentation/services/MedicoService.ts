import { Especialidades } from "../../data/models/Especialidades";
import { Medicos } from "../../data/models/Medicos";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";

export class MedicoService {

    public static async getAllMedicos(): Promise<[string?,Medicos[]?]> {
        try {
            const medicos = await Medicos.findAll({
                include: [
                    {
                        model: Especialidades,
                        as: "especialidad",
                        attributes: ["nombre"]
                    }
                ]
            });
            if(!medicos){
                return ["No se obtuvieron medicos registrados", undefined]
            }
            return [undefined, medicos]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getAllMedicos","MedicoService","7",error as string)
            return ["Error al obtener todos los medicos", null];
        }
    }
    public static async getMedicoById(id: number): Promise<[string?, Medicos?]> { //* TESTEADO
        // Busca un medico por su ID y devuelve sus datos junto con la especialidad asociada
        try {
            if(id === undefined || id === null || id <= 0) {
                return ["ID de medico invalido", null];
            }
            const medico = await Medicos.findOne({
                where: { id_Medico: id },
                include: [
                    {
                        model: Especialidades,
                        as: 'especialidad',
                        attributes: ['id_Especialidad', 'nombre']
                    }
                ]
            });

            if (!medico) {
                return ["Medico no encontrado", null];
            }

            return [undefined, medico];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getMedicoById","MedicoService","18",error as string)
            return ["Error al buscar el medico", null];
        }
    }

}
