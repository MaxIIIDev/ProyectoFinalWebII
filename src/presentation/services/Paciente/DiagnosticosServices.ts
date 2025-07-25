import { Op } from "sequelize";
import { Paciente_Diagnosticos } from "../../../data/models/Paciente_Diagnosticos";
import { CreateDiagnosticoDto } from "../../../domain/Dtos/pacientes/Diagnosticos/createDiagnosticoDto";
import { UpdateDiagnosticoDto } from "../../../domain/Dtos/pacientes/Diagnosticos/updateDiagnosticoDto";
import { HelperForCreateErrors } from "../../../Helpers/HelperForCreateErrors";



export class DiagnosticosServices {
    
    public static async getAllDiagnosticos(): Promise<[string?, Paciente_Diagnosticos[]?]> {
        try {
            const diagnosticos = await Paciente_Diagnosticos.findAll();
            if(!diagnosticos) return ["No se encontraron diagnosticos", undefined]
            return [undefined, diagnosticos]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getAllDiagnosticos","DiagnosticosServices","8",error as string)
            return [error as string, undefined]
        }
    }
    public static async getDiagnosticoById(id_Diagnostico: number): Promise<[string?, Paciente_Diagnosticos?]> {
        try {
            const diagnostico = await Paciente_Diagnosticos.findByPk(id_Diagnostico);
            if(!diagnostico) return ["No se encontro el diagnostico", undefined]
            return [undefined, diagnostico]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getDiagnosticoById","DiagnosticosServices","8",error as string)
            return [error as string, undefined]
        }
    }
    public static async getAllDiagnosticosByPaciente(id_Paciente: number): Promise<[string?, Paciente_Diagnosticos[]?]> {
        try {
            
            const diagnosticos = await Paciente_Diagnosticos.findAll({where: {id_Paciente}});
            if(!diagnosticos) return ["No se encontraron diagnosticos", undefined]
            return [undefined, diagnosticos]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getAllDiagnosticosByPaciente","DiagnosticosServices","8",error as string)
            return [error as string, undefined]
        }
    }   
    public static async validarSiNoEstaDuplicadoElDiagnostico(_createDiagnosticoDto: CreateDiagnosticoDto,_updateDiagnosticoDto:UpdateDiagnosticoDto):Promise<[string?,boolean?]>{
        try {
            let validado:boolean = true;
            if(_updateDiagnosticoDto){
                const buscarDiagnostico = await Paciente_Diagnosticos.findOne({where: {
                    
                    id_Paciente: _updateDiagnosticoDto.id_paciente,
                    id_tipo_de_diagnostico: _updateDiagnosticoDto.id_tipo_de_diagnostico,
                    id_Admision: _updateDiagnosticoDto.id_Admision,
                    id_Paciente_Diagnosticos: {[Op.ne]: _updateDiagnosticoDto.id_Paciente_Diagnosticos}
                }});
                if(buscarDiagnostico[0]) return ["Ya existe un diagnostico con esas caracteristicas", false]
                validado = true;
            }
            if(_createDiagnosticoDto){
                const buscarDiagnostico = await Paciente_Diagnosticos.findOne({where: {
                    id_Paciente: _createDiagnosticoDto.id_paciente,
                    id_tipo_de_diagnostico: _createDiagnosticoDto.id_tipo_de_diagnostico,
                    id_Admision: _createDiagnosticoDto.id_Admision,
                }});
                if(buscarDiagnostico[0]) return ["Ya existe un diagnostico con esas caracteristicas", false]
                validado = true;
            }
            return [undefined, validado]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("validarSiNoEstaDuplicadoElDiagnostico","DiagnosticosServices","8",error as string)
            return [error as string, undefined]
        }
    }
    public static async createDiagnostico(_createDiagnosticoDto: CreateDiagnosticoDto): Promise<[string?, Paciente_Diagnosticos?]> {
        try {
            const validarSiNoEstaDuplicado = await this.validarSiNoEstaDuplicadoElDiagnostico(_createDiagnosticoDto, undefined)
            if(!validarSiNoEstaDuplicado[1]) return [validarSiNoEstaDuplicado[0], undefined]
            const diagnosticoCreado = await Paciente_Diagnosticos.create(CreateDiagnosticoDto.toObject(_createDiagnosticoDto));
            if(!diagnosticoCreado) return ["No se pudo crear el diagnostico", undefined]
            return [undefined, diagnosticoCreado]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("createDiagnostico","DiagnosticosServices","8",error as string)
            return [error as string, undefined]
        }
    }
    public static async updateDiagnostico(_updateDiagnosticoDto: UpdateDiagnosticoDto): Promise<[string?, boolean?]> {
        try {
            const validarSiNoEstaDuplicado = await this.validarSiNoEstaDuplicadoElDiagnostico(undefined, _updateDiagnosticoDto)
            if(!validarSiNoEstaDuplicado[1]) return [validarSiNoEstaDuplicado[0], false]
            if(!await this.getDiagnosticoById(_updateDiagnosticoDto.id_Paciente_Diagnosticos)[1]) return ["No se encontro el diagnostico", false]
           
            const diagnosticoActualizado = await Paciente_Diagnosticos.update(UpdateDiagnosticoDto.toObject(_updateDiagnosticoDto), {where: {id_Paciente_Diagnosticos: _updateDiagnosticoDto.id_Paciente_Diagnosticos}});
            if(!diagnosticoActualizado) return ["No se pudo actualizar el diagnostico", false]
            return [undefined, true]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("updateDiagnostico","DiagnosticosServices","8",error as string)
            return [error as string, undefined]
        }
    }
    public static async deleteDiagnostico(id_Diagnostico: number): Promise<[string?, boolean?]> {
        try {
            if(! await this.getDiagnosticoById(id_Diagnostico)[1]) return ["No se encontro el diagnostico", false]
            const diagnosticoEliminado = await Paciente_Diagnosticos.destroy({where: {id_Paciente_Diagnosticos: id_Diagnostico}});
            if(!diagnosticoEliminado) return ["No se pudo eliminar el diagnostico", false]
            return [undefined, true]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("deleteDiagnostico","DiagnosticosServices","8",error as string)
            return [error as string, undefined]
        }
    }
}