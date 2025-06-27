import { Paciente_Alergias } from "../../../data/models/Paciente_Alergias";
import { createAlergiaDto } from "../../../domain/Dtos/pacientes/Alergias/createAlergiaDto";
import { updateAlergiaDto } from "../../../domain/Dtos/pacientes/Alergias/updateAlergiaDto";
import { HelperForCreateErrors } from "../../../Helpers/HelperForCreateErrors";
import { PacienteServices } from "../PacientesService";

export class AlergiaService {
    public static async buscarAlergiaPorId(_id_Alergia):Promise<[string?,Paciente_Alergias?]>{ //todo: Falta testear
        try {
            if(!_id_Alergia) return ["Se requiere id_Alergia"]
            if(_id_Alergia < 0) return ["id_Alergia no puede ser negativo"]
            const alergiaEncontrada = await Paciente_Alergias.findOne({
                where: {
                    id_Alergia: _id_Alergia
                }
            })
            if(!alergiaEncontrada) return ["No se encontro una alergia registrada por dicho id"]
            return [undefined, alergiaEncontrada]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarAlergiaPorID","AlergiaService","7",error as string)
            return [error, undefined]
        }
    }
    public static async buscarTodasLasAlergiasPorPaciente(_id_Paciente:number):Promise<[string?, Paciente_Alergias[]?]> {//todo: Falta testear
        try {
            
            if(!_id_Paciente || _id_Paciente < 0 ) return ["El id_Paciente es nulo o es menor que 0", undefined]
            if(!(await PacienteServices.buscarPacienteDesconocido(_id_Paciente).then(res => res[0]))){
                return ["No se encontro dicho paciente registrado", undefined]
            }
            const alergiasEncontradas = await Paciente_Alergias.findAll({
                where: {
                    id_paciente: _id_Paciente
                }
            })
            if(!alergiasEncontradas || alergiasEncontradas.length <= 0) return ["No se encontraron alergias para dicho paciente", undefined]
            return [undefined, alergiasEncontradas]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarTodasLasAlergiasPorPaciente","AlergiaService","23",error as string)
            return [error, undefined]
        }
    }
    public static async buscarAlergiaPorPaciente(_id_paciente: number, _id_nombre_alergia: number):Promise<[string?,Paciente_Alergias?]>{//todo: Falta testear
        try {
            if(!_id_paciente) return ["Se requiere el id_paciente",undefined]
            if(!_id_nombre_alergia) return ["Se requiere el id_nombre_alergia",undefined]
            if(_id_paciente < 0) return ["El id_paciente no puede ser negativo"]
            if(_id_nombre_alergia < 0) return ["El id_nombre_alergia no puede ser negativo"]
            const alergiaBuscada = await Paciente_Alergias.findOne({
                where: {
                    id_nombre_alergia: _id_nombre_alergia,
                    id_paciente: _id_paciente
                }
            })
            if(!alergiaBuscada) return ["No se encontro asignada dicha alergia a este paciente", undefined]
            
            return [null, alergiaBuscada]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarAlergiaPorPaciente","AlergiaService","6",error as string)
            return [error, undefined]
        }
    }
    public static async registrarAlergia(_createAlergiaDto: createAlergiaDto): Promise<[string?,Paciente_Alergias?]> {//todo: Falta testear
        try {
            if((await this.buscarAlergiaPorPaciente(_createAlergiaDto.id_paciente,_createAlergiaDto.id_nombre_alergia).then(res => res[1]))){
                return ["El paciente ya tiene registrada dicha alergia",undefined]
            }
            const alergiaCreada = await Paciente_Alergias.create(createAlergiaDto.toObject(_createAlergiaDto));
            if(!alergiaCreada){
                return ["No se pudo crear la alergia", undefined]
            }
            return[undefined, alergiaCreada]

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("registrarAlergia","AlergiaService","50",error as string)
            return [error, undefined]
        }
    }
    public static async actualizarAlergia(_updateAlergiaDto:updateAlergiaDto):Promise<[string?,number?]>{//EL numero son las filas afectadas, si es 0, no se actualizo
        try {//todo: Falta testear
            if(!(await this.buscarAlergiaPorId(_updateAlergiaDto.id_Alergia).then(res => res[1]))){
                return ["No se encontro una alergia registrada para dicho paciente", undefined]
            }
            const alergiaActualizada = await Paciente_Alergias.update(updateAlergiaDto.toObject(_updateAlergiaDto), {
                where: {
                    id_Alergia: _updateAlergiaDto.id_Alergia
                }
            })
            return [undefined,alergiaActualizada[0]]

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarAlergia","AlergiaService","42",error as string)
            return [error, undefined]
        }
    }
    public static async eliminarAlergia(_id_nombre_alergia: number,_id_paciente:number): Promise<[string?, boolean?]>{
        try {//todo: Falta testear
            if(!_id_nombre_alergia || _id_nombre_alergia < 0) return ["id_Alergia es menor que 0 o es null"]
            if(!_id_paciente || _id_paciente < 0) return [" id_Paciente es menor que 0 o es null"]
            if(!(await this.buscarAlergiaPorPaciente(_id_paciente,_id_nombre_alergia).then(res=> res[1]))){
                return ["No se encuentra dicha alergia registrada al paciente ", false]
            }
            const confirmacion = await Paciente_Alergias.destroy({
                where: {
                    id_paciente: _id_paciente,
                    id_nombre_alergia: _id_nombre_alergia
                }
            })
            if(!confirmacion || confirmacion == 0) return ["No se elimino la alergia", false]
            return [undefined, true]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("eliminarAlergia","AlergiaService","76",error as string)
            return [error as string, false]
        }
    }
}
