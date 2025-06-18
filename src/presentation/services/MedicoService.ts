import { Especialidades } from "../../data/models/Especialidades";
import { Medicos } from "../../data/models/Medicos";

export class MedicoService {


    public static async getMedicoById(id: number): Promise<[string?, any?]> { //* TESTEADO
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
            console.error("Error al buscar el medico:", error);
            return ["Error al buscar el medico", null];
        }
    }

}
