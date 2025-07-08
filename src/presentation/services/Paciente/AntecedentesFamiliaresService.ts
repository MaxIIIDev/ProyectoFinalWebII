import { Op } from "sequelize";
import { Lazo_Familiar } from "../../../data/models/Lazo_familiar";
import { Paciente_antecedentes_familiares } from "../../../data/models/Paciente_antecedentes_familiares";
import { createAntecedenteFamiliarDto } from "../../../domain/Dtos/pacientes/AntecedentesFamiliares.ts/createAntecedenteFamiliarDto";
import { updateAntecedenteFamiliarDto } from "../../../domain/Dtos/pacientes/AntecedentesFamiliares.ts/updateAntecedenteFamiliarDto";
import { HelperForCreateErrors } from "../../../Helpers/HelperForCreateErrors";
import { PacienteServices } from "../PacientesService";


export class AntecedentesFamiliaresService{

    public static async buscarAntecedenteFamiliarPorId(_id_Antecedente_Familiar:number):Promise<[string?,Paciente_antecedentes_familiares?]>{ //todo: TESTEAR
        try {
            if(!_id_Antecedente_Familiar || _id_Antecedente_Familiar < 0){
                return ["El antecedente es nulo o es un numero negativo"]
            }
            const antecedenteFamiliarBuscado = await Paciente_antecedentes_familiares.findOne({
                where: {
                    id_Antecedente_Familiar: _id_Antecedente_Familiar
                }
            })
            if(!antecedenteFamiliarBuscado) return ["El antecedente no se encuentra registrado", undefined]
            return [ undefined, antecedenteFamiliarBuscado]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarAntecedenteFamiliarPorId","AntecedentesFamiliaresService","10",error as string)
            return [ error as string, undefined]
        }
    }
    public static async buscarAntecedentesFamiliaresPorPaciente(id_Paciente: number): Promise<[string?,AntecedentesFamiliaresService[]?]>{//todo: TESTEAR
        try {
            if(!id_Paciente || Number(id_Paciente) < 0 ) return ["El id_Paciente es nulo || id_Paciente es menor que 0"]
            if(!(await PacienteServices.getPacienteById(id_Paciente).then(res => res[1]))){
                return ["El paciente no se encuentra registrado", undefined]
            }
            const antecedentesFamiliaresDelPaciente = await Paciente_antecedentes_familiares.findAll({
                where: {
                    id_Paciente: id_Paciente
                },
                include: [
                    {
                        model: Lazo_Familiar,
                        as: "lazo_familiar",
                        attributes: ["id_Lazo_Familiar", "lazo"]
                    }
                ]
            })
            return [ undefined, antecedentesFamiliaresDelPaciente]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarAntecedentesFamiliaresPorPaciente","AntecedentesFamiliaresService","24",error as string);
            return [error as string, undefined]
        }
    }
    public static async validarAntecedenteFamiliarIdentico(_updateAtencenteFamiliarDto?:updateAntecedenteFamiliarDto, _createAntecenteFamiliarDto?: createAntecedenteFamiliarDto):Promise<[string?, boolean?]>{//todo: TESTEAR
        try {
            if(_updateAtencenteFamiliarDto){
                const antecedenteBuscado = await Paciente_antecedentes_familiares.findOne({
                    where: {
                        id_Paciente: _updateAtencenteFamiliarDto.id_Paciente,
                        nombre_Enfermedad: _updateAtencenteFamiliarDto.nombre_Enfermedad.trim(),
                        id_Lazo_Familiar: _updateAtencenteFamiliarDto.id_Lazo_Familiar,
                        id_Antecedente_Familiar: {
                            [Op.ne]: _updateAtencenteFamiliarDto.id_Antecedente_Familiar
                        }
                    }
                })            
                if(!antecedenteBuscado) return [undefined, true]
                return [ undefined, false]
            }
            if(_createAntecenteFamiliarDto){
                const antecedenteBuscado = await Paciente_antecedentes_familiares.findOne({
                    where: {
                        id_Paciente: _createAntecenteFamiliarDto.id_Paciente,
                        nombre_Enfermedad: _createAntecenteFamiliarDto.nombre_Enfermedad.trim(),
                        id_Lazo_Familiar: _createAntecenteFamiliarDto.id_Lazo_Familiar
                    }
                })            
                if(!antecedenteBuscado) return [undefined, true]
                return [ undefined, false]
            }
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("validarAntecedenteFamiliarIdentico","AntecedentesFamiliaresServices","44",error as string)
            return [error as string, false]
        }
    }
    public static async createAntecedenteFamiliar(_createAntecenteFamiliarDto: createAntecedenteFamiliarDto):Promise<[string?,Paciente_antecedentes_familiares?]>{//todo: TESTEAR
        try {
            if(!(await PacienteServices.getPacienteById(_createAntecenteFamiliarDto.id_Paciente).then(res => res[1]))){
                return ["No se encontro regitrado el paciente", undefined]
            }
            if(!(await this.validarAntecedenteFamiliarIdentico(null, _createAntecenteFamiliarDto).then(res=> {
                const valido = (!res[0] && res[1]== false)?  false:  true
                return valido;
            }))){
                return ["Ya existe un registro identico", undefined]
            }
            const registroCreado = await Paciente_antecedentes_familiares.create(createAntecedenteFamiliarDto.toObject(_createAntecenteFamiliarDto))
            if(!registroCreado) return ["No se creo el registro", undefined]

            return [undefined, registroCreado]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("createAntecedenteFamiliar","AntecedentesFamiliaresService","44",error as string)
            return [error as string, undefined]
        }
    }
    public static async updateAntecedenteFamiliar(_updateAntecedenteFamiliarDto:updateAntecedenteFamiliarDto):Promise<[string?,boolean?]>{//todo: TESTEAR
        try {
            if(!(await PacienteServices.getPacienteById(_updateAntecedenteFamiliarDto.id_Paciente).then(res => res[1]))){
                return ["No se encontro regitrado el paciente", undefined]
            }
            if(!(await this.validarAntecedenteFamiliarIdentico(_updateAntecedenteFamiliarDto,undefined ).then(res=> {
                const valido = (!res[0] && res[1]== false)?  false:  true
                return valido;
            }))){
                return ["Ya existe un registro identico", undefined]
            }
            const registroActualizado = await Paciente_antecedentes_familiares.update(updateAntecedenteFamiliarDto.toObject(_updateAntecedenteFamiliarDto), {
                where: {
                    id_Antecedente_Familiar: _updateAntecedenteFamiliarDto.id_Antecedente_Familiar,
                    id_Paciente: _updateAntecedenteFamiliarDto.id_Paciente
                }
            })
            if(!registroActualizado || registroActualizado[0] < 0) return ["No se actualizo el registro", false]
            return [undefined, true]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("updateAntecedenteFamiliar","AntecedentesFamiliaresService","87",error as string)
            return [error as string, false]
        }
    }
    public static async deleteAntecedenteFamiliar(id_Paciente:number, id_Antecedente_Familiar:number):Promise<[string?, boolean?]>{//todo: TESTEAR
        try {
            if(!id_Paciente || id_Paciente < 0 ) return ["El id_Paciente es nulo o es menor que 0", false]
            if(!id_Antecedente_Familiar || id_Antecedente_Familiar < 0 ) return ["El id_Antecedente_Familiar es nulo o es menor que 0", false]
            if(!(await PacienteServices.getPacienteById(id_Paciente).then(res=> res[1]))) return ["El paciente no se encuentra registrado", false]
            if(!(await this.buscarAntecedenteFamiliarPorId(id_Antecedente_Familiar).then(res => res[1]))) return ["No se encontro registrado el antecedente familiar con dicho ID", false]
            const confirmacionEliminacion = await Paciente_antecedentes_familiares.destroy({
                where:{
                    id_Antecedente_Familiar:id_Antecedente_Familiar,
                    id_Paciente: id_Paciente
                }
            })
            if(!confirmacionEliminacion || confirmacionEliminacion < 0) return ["No se elimino el registro", false]
            return [undefined, true]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("deleteAntecedenteFamiliar","AntecedentesFamiliaresService","110",error as string)
            return [error as string, false]
        }
    }

}