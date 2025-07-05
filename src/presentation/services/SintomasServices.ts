import { Op } from "sequelize";
import { Sintomas } from "../../data/models/Sintomas"
import { CreateSintomaDto } from "../../domain/Dtos/pacientes/Sintomas/createSintomaDto";
import { UpdateSintomaDto } from "../../domain/Dtos/pacientes/Sintomas/updateSintomaDto";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors"
import { NombreSintomaService } from "./NombreSintomaService";
import { DiagnosticosServices } from "./Paciente/DiagnosticosServices";
import { Model } from "sequelize-typescript";
import { Admision } from "../../data/models/Admision";
import { Enfermero } from "../../data/models/Enfermero";
import { Nombre_Sintoma } from "../../data/models/nombre_sintoma";

export class SintomasServices {

    public static async getAllSintomas(): Promise<[string?, Sintomas[]?]> {
        
        try {
            const sintomas = await Sintomas.findAll();
            if(!sintomas) return ["No se encontraron sintomas", undefined]
            return [undefined, sintomas]

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getAllSintomas","SintomasServices","8",error as string)
            return [error as string, undefined]
        }
    }
    public static async getSintomaById(id_Sintoma: number): Promise<[string?, Sintomas?]> {
        try {
            const sintoma = await Sintomas.findByPk(id_Sintoma);
            if(!sintoma) return ["No se encontro el sintoma", undefined]
            return [undefined, sintoma]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getSintomaById","SintomasServices","8",error as string)
            return [error as string, undefined]
        }
    }
    public static async getAllSintomasByPaciente(id_Paciente: number): Promise<[string?, Sintomas[]?]> {
        try {
            const sintomas = await Sintomas.findAll({
                include: [
                    {
                        model: Admision,
                        as: "admision",
                        where: {
                            id_Paciente: id_Paciente
                        }
                    },
                    {
                        model: Nombre_Sintoma,
                        as: "nombre_sintoma"
                    }
                ],
                
            });
            if(!sintomas) return ["No se encontraron sintomas", undefined]
            return [undefined, sintomas]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getAllSintomasByPaciente","SintomasServices","8",error as string)
            return [error as string, undefined]
        }
    }
    public static async getAllSintomasByPacienteAndAdmision(id_Paciente: number,id_Admision: number): Promise<[string?, Sintomas[]?]> {
        try {
            const sintomas = await Sintomas.findAll({
                include: [
                    {
                        model: Admision,
                        as: "admision",
                        where: {
                            id_Paciente: id_Paciente,
                            id_Admision: id_Admision
                        }
                    },
                    {
                        model: Nombre_Sintoma,
                        as: "nombre_sintoma"
                    }
                ],
                
            });
            if(!sintomas) return ["No se encontraron sintomas", undefined]
            return [undefined, sintomas]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getAllSintomasByPaciente","SintomasServices","8",error as string)
            return [error as string, undefined]
        }
    }
    public static async validarSiNoEstaDuplicado(_createSintomaDto:CreateSintomaDto,_updateSintomaDto:UpdateSintomaDto):Promise<[string?,boolean?]>{
        try {
            let validado:boolean = true;
            if(_updateSintomaDto){
                const buscarSintoma = await Sintomas.findOne({where: {
                    id_Admision: _updateSintomaDto.id_Admision,
                    id_Nombre_Sintoma: _updateSintomaDto.id_Nombre_Sintoma,
                    id_Paciente_Diagnosticos: _updateSintomaDto.id_Paciente_Diagnosticos,
                    id_Sintoma: {[Op.ne]: _updateSintomaDto.id_Sintoma}
                }});
                if(buscarSintoma[0]) return ["Ya existe un sintoma con esas caracteristicas", false]
                validado = true;
            }
            if(_createSintomaDto){
                const buscarSintoma = await Sintomas.findOne({where: {
                    id_Admision: _createSintomaDto.id_Admision,
                    id_Nombre_Sintoma: _createSintomaDto.id_Nombre_Sintoma,
                    id_Paciente_Diagnosticos: _createSintomaDto.id_Paciente_Diagnosticos,
                }});
                if(buscarSintoma[0]) return ["Ya existe un sintoma con esas caracteristicas", false]
                validado = true;
            }
            return [undefined, validado]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("validarSiNoEstaDuplicado","SintomasServices","8",error as string)
            return [error as string, undefined]
        }
    }
    public static async createSintoma(_createSintomaDto: CreateSintomaDto): Promise<[string?, Sintomas?]> {
        try {
            const validarSiNoEstaDuplicado = await this.validarSiNoEstaDuplicado(_createSintomaDto, undefined)
            if(!validarSiNoEstaDuplicado[1]) return [validarSiNoEstaDuplicado[0], undefined]
            const nombreSintoma = await NombreSintomaService.getNombreSintomaById(_createSintomaDto.id_Nombre_Sintoma);
            if(nombreSintoma[0]) return [nombreSintoma[0], undefined]

            const sintomaCreado = await Sintomas.create(CreateSintomaDto.toObject(_createSintomaDto));
            if(!sintomaCreado) return ["No se pudo crear el sintoma", undefined]
            return [undefined, sintomaCreado]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("createSintoma","SintomasServices","8",error as string)
            return [error as string, undefined]
        }
    }
    public static async updateSintoma(_updateSintomaDto: UpdateSintomaDto): Promise<[string?, boolean?]> {
        try {
            const validarSiNoEstaDuplicado = await this.validarSiNoEstaDuplicado(undefined, _updateSintomaDto)
            if(!validarSiNoEstaDuplicado[1]) return [validarSiNoEstaDuplicado[0], false]
           
            const buscarSintoma = await this.getSintomaById(_updateSintomaDto.id_Sintoma);
            if(buscarSintoma[0]) return [buscarSintoma[0], false]
           
            if(_updateSintomaDto.id_Nombre_Sintoma){
                const nombreSintoma = await NombreSintomaService.getNombreSintomaById(_updateSintomaDto.id_Nombre_Sintoma);
                if(nombreSintoma[0]) return [nombreSintoma[0], false]
            }
            if(_updateSintomaDto.id_Paciente_Diagnosticos){
                const buscarDiagnostico = await DiagnosticosServices.getDiagnosticoById(_updateSintomaDto.id_Paciente_Diagnosticos);
                if(buscarDiagnostico[0]) return [buscarDiagnostico[0], false]
            }

            const sintomaActualizado = await Sintomas.update(UpdateSintomaDto.toObject(_updateSintomaDto), {where: {id_Sintoma: _updateSintomaDto.id_Sintoma}});
            if(!sintomaActualizado) return ["No se pudo actualizar el sintoma", false]
            return [undefined, true]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("updateSintoma","SintomasServices","8",error as string)
            return [error as string, undefined]
        }
    }
    public static async deleteSintoma(id_Sintoma: number): Promise<[string?, boolean?]> {
        try {
            const sintomaEliminado = await Sintomas.destroy({where: {id_Sintoma}});
            if(!sintomaEliminado) return ["No se pudo eliminar el sintoma", false]
            return [undefined, true]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("deleteSintoma","SintomasServices","8",error as string)
            return [error as string, undefined]
        }
    }
}