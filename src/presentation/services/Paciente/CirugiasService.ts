import { Paciente_Cirugias } from "../../../data/models/Paciente_Cirugias";
import { createCirugiaDto } from "../../../domain/Dtos/pacientes/Cirugias/createCirugiaDto";
import { updateCirugiaDto } from "../../../domain/Dtos/pacientes/Cirugias/updateCirugiaDto";
import { HelperForCreateErrors } from "../../../Helpers/HelperForCreateErrors";
import { PacienteServices } from "../PacientesService";


export class CirugiasService {

    public static async buscarCirugiaPorId(id_cirugia: number):Promise<[string?, Paciente_Cirugias?]>{//todo:TESTEAR

        try {
            if(!id_cirugia || id_cirugia < 0) return ["Se requiere id_cirugia o es menor que 0", undefined]
            const cirugiaEncontrada = await Paciente_Cirugias.findOne({
                where: {
                    id_cirugia: id_cirugia
                }
            })
            if(!cirugiaEncontrada) return ["No se encontro la cirugia por dicho Id", undefined]
            return [undefined, cirugiaEncontrada];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarCirugiaPorId","CirugiaService","6",error as string)
            return [error as string]
        }

    }
    public static async buscarCirugiaIdentica(_createCirugiaDto : createCirugiaDto):Promise<[string?,boolean?]>{//todo:TESTEAR
        try {
            const cirugiaEncontrada = Paciente_Cirugias.findOne({
                where: createCirugiaDto.toObject(_createCirugiaDto)
            })
            if(!cirugiaEncontrada) return [undefined, false]
            return [undefined, true]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarCirugiaIdentica","CirugiasServices","26",error as string)
            return [error as string ,false]
        }
    }
    public static async buscarCirugiasPorPaciente( id_paciente: number):Promise<[string?, Paciente_Cirugias[]?]>{//todo:TESTEAR
        try {
            if(!id_paciente || id_paciente < 0) return ["Se requiere id_paciente o es menor que 0", undefined]
            if(!(await PacienteServices.getPacienteById(id_paciente).then(res=> res[0]))){
                return ["No se encontro el paciente registrado", undefined]
            }
            const cirugiaEncontrada = await Paciente_Cirugias.findAll({
                where: {
                    id_paciente: id_paciente
                }   
            })
            if(!cirugiaEncontrada) return ["El paciente no tiene cirugias asociadas", undefined]
            return [undefined, cirugiaEncontrada];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarCirugiasPorPaciente","CirugiaService","6",error as string)
            return [error as string]
        }
    }
    public static async validarSiLaCirugiaEstaRegistradaAlPaciente(id_cirugia:number, id_paciente:number):Promise<[string?, boolean?]>{//todo:TESTEAR
        try {
            if(!id_cirugia || id_cirugia < 0) return ["id_cirugia es nulo o es menor que 0", false]
            if(!id_paciente || id_paciente < 0) return ["id_paciente es nulo o es menor que 0", false]
            if(!(await PacienteServices.getPacienteById(id_paciente).then(res=> res[0]))){
                return ["No se encontro el paciente registrado", undefined]
            }
            if(!(await this.buscarCirugiaPorId(id_cirugia).then(res=> res[1]))){
                return ["No se encontro la cirugia registrada", undefined]
            }
            const cirugiaBuscada = await Paciente_Cirugias.findOne({
                where: {
                    id_cirugia: id_cirugia,
                    id_paciente: id_paciente
                }
            })
            if(!cirugiaBuscada) return [undefined, false]
            return [ undefined, true]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("validarSiLaCirugiaEstaRegistradaAlPaciente","CirugiaService","61",error as string)
            return [error as string, false]
        }
    }
    public static async crearCirugia(_createCirugiaDto: createCirugiaDto):Promise<[string?, Paciente_Cirugias?]>{//todo:TESTEAR
        try {
            const cirugiaIdentica = await this.buscarCirugiaIdentica(_createCirugiaDto)
            if(!(cirugiaIdentica[0] == undefined && cirugiaIdentica[1] == false)){
                return [cirugiaIdentica[0], undefined]
            }
            const cirugiaCreada = await Paciente_Cirugias.create(createCirugiaDto.toObject(_createCirugiaDto))
            if(!cirugiaCreada) return ["No se creo la cirugia", undefined]
            return [undefined, cirugiaCreada]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearCirugia","CirugiasService","44",error as string);
            return [error as string, undefined]
        }
    }
    public static async actualizarCirugia(_updateCirugiaDto: updateCirugiaDto):Promise<[string?, boolean?]>{//todo:TESTEAR
        try {
            if(!(await this.buscarCirugiaPorId(_updateCirugiaDto.id_cirugia).then(res => res[1]))){
                return ["No se encontro registrada la cirugia", false];
            }
            const cirugiaActualizada = await Paciente_Cirugias.update(updateCirugiaDto.toObject(_updateCirugiaDto),{where: {
                id_cirugia: _updateCirugiaDto.id_cirugia
            }})
            if(!cirugiaActualizada || cirugiaActualizada[0] < 0) return ["No se actualizo el registro de cirugia", false]
            return [undefined, true]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarCirugia","CirugiasService","71",error as string)
            return [error as string ,false]
        }
    }
    public static async eliminarCirugia(id_cirugia: number, id_paciente: number){//todo:TESTEAR
        try {
            if(!id_cirugia || id_cirugia < 0) return ["id_cirugia es nulo o es menor que 0", false]
            if(!id_paciente || id_paciente < 0) return ["id_paciente es nulo o es menor que 0", false]
            if(!(await this.buscarCirugiaPorId(id_cirugia).then(res=> res[1]))){
                return ["No se encuentra registrada la cirugia", false]
            }
            const cirugiaValida = await this.validarSiLaCirugiaEstaRegistradaAlPaciente(id_cirugia,id_paciente);
            if(cirugiaValida[0]){
                return [cirugiaValida[0], false]
            }
            if(cirugiaValida[0]== undefined && cirugiaValida[1] == false){
                return ["La cirugia no se encuentra registrada al paciente",false]
            }
            const registroEliminado = await Paciente_Cirugias.destroy({
                where: {
                    id_cirugia: id_cirugia,
                    id_paciente: id_paciente
                }
            })
            if(!registroEliminado || registroEliminado < 0 ) return [ undefined, false]
            return [undefined, true]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("eliminarCirugia","CirugiasServices","86",error as string)
            return [ error as string, false]
        }
    }
}