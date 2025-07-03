import { Op } from "sequelize";
import { Admision } from "../../../data/models/Admision";
import { Medicamentos } from "../../../data/models/Medicamentos";
import { Paciente_Medicacion_Actual } from "../../../data/models/Paciente_Medicacion_Actual";
import { createMedicacionActualDto } from "../../../domain/Dtos/pacientes/Medicacion Actual/createMedicacionActualDto";
import { updateMedicacionActualDto } from "../../../domain/Dtos/pacientes/Medicacion Actual/updateMedicacionActualDto";
import { HelperForCreateErrors } from "../../../Helpers/HelperForCreateErrors";
import { MedicamentosServices } from "../MedicamentosServices";


export class MedicacionActualService {

    public static async buscarLasMedicacionesActualesPorPacienteYAdmision(id_Paciente: number, id_Admision: number):Promise<[string?,Paciente_Medicacion_Actual[]?]>{//todo:testear
        try {
            
            if(!id_Paciente || Number(id_Paciente) < 0) return ["id_Paciente es nulo o menor que 0",undefined]
            if(!id_Admision || Number(id_Admision) < 0) return ["id_Admision es nulo o menor que 0",undefined]
            const medicacionesPaciente = await Paciente_Medicacion_Actual.findAll({
                where: {
                    id_Paciente: id_Paciente,
                    id_Admision: id_Admision
                },
                include:[
                    {
                        model: Admision,
                        as: "admision",
                        attributes: ["fecha_de_admision"]
                    },
                    {
                        model: Medicamentos,
                        as: "medicamentos",
                        attributes: ["nombre"]    
                    }
                ]
            })
            if(!medicacionesPaciente) return ["No hay registradas medicaciones actuales",undefined]
            return [undefined, medicacionesPaciente]


        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarLasMedicacionesActualesPorPaciente","MedicacionActualService","6",error as string)
            return [error as string , undefined ]
        }
    }
    public static async buscarMedicacionActualPorId(id_Paciente_Medicacion_Actual: number):Promise<[string?,Paciente_Medicacion_Actual?]>{//todo:testear
        try {
            if(!id_Paciente_Medicacion_Actual) return ["Se requiere el id_Paciente_Medicacion_Actual "]
            const busqueda = await Paciente_Medicacion_Actual.findOne({
                where: {
                    id_Paciente_Medicacion_Actual: id_Paciente_Medicacion_Actual
                }
            })
            if(!busqueda) return[ "No se encontro registrada la mediacion actual por id", undefined]
            return [undefined, busqueda]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarMedicacionActualPorId","MedicacionActualService","40",error as string)
            return [error as string,undefined]
        }
    }
    public static async existeMedicacionActual(_createMedicacionActual?: createMedicacionActualDto, _updateMedicacionActual?: updateMedicacionActualDto): Promise<[string?, boolean?]> {
        try {
            if(!_createMedicacionActual && !_updateMedicacionActual) {
                return ["Se requiere el _createMedicacionActual || _updateMedicacionActual "];
            }
    
            const objectMedicacionActual = _createMedicacionActual 
                ? createMedicacionActualDto.toObject(_createMedicacionActual) 
                : updateMedicacionActualDto.toObject(_updateMedicacionActual);
    
            const whereClause: any = {
                id_Medicamento: objectMedicacionActual.id_Medicamento,
                id_Paciente: objectMedicacionActual.id_Paciente,
                id_Admision: objectMedicacionActual.id_Admision
            };
    
            if(_updateMedicacionActual) {
                whereClause.id_Paciente_Medicacion_Actual = {
                    [Op.ne]: objectMedicacionActual.id_Paciente_Medicacion_Actual
                };
            }
    
            const confirmacion = await Paciente_Medicacion_Actual.findOne({
                where: whereClause
            });
    
            return [undefined, !!confirmacion];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("validarMedicacionActual", "MedicacionACtualService","30",error as string)
            return [error as string, undefined];
        }
    }
    public static async crearMedicacionActual(_createMedicacionActual: createMedicacionActualDto):Promise<[string?,Paciente_Medicacion_Actual?]>{//todo:testear
        try {
            
            if(!await MedicamentosServices.buscarMedicamentoPorId(_createMedicacionActual.id_Medicamento).then(res => res[1])) return["No se encontro el medicamento registrado por dicho Id", undefined]
            if(await this.existeMedicacionActual(_createMedicacionActual, null  ).then(res=> res[1])){
                return ["Ya existe dicho registro", undefined]
            }
            const medicamentoCreado = await Paciente_Medicacion_Actual.create(createMedicacionActualDto.toObject(_createMedicacionActual))
            if(!medicamentoCreado) return ["No se creo el medicamentoActual ", undefined]
            return [undefined, medicamentoCreado]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearMedicacionActual","MedicacionActualService","25",error as string)
            return [error as string, undefined]
        }
    }
    public static async actualizarMedicacionActual(_updateMedicacionActual: updateMedicacionActualDto):Promise<[string?,boolean?]>{//todo:testear
        try {
            const MedicacionActual = await this.buscarMedicacionActualPorId(_updateMedicacionActual.id_Paciente_Medicacion_Actual)
            if(!MedicacionActual[1]) return ["No se encontro registrada la medicacion actual por id", false]
            MedicacionActual[1].id_Medicamento = _updateMedicacionActual.id_Medicamento
            
            if(await this.existeMedicacionActual(null,_updateMedicacionActual).then(res=>res[1])) return ["Ya existe dicho registro", false]
            if(!await MedicamentosServices.buscarMedicamentoPorId(_updateMedicacionActual.id_Medicamento).then(res=>res[1])) return ["No se encontro el medicamento registrado con dicho Id"]
            const actualizacion = await Paciente_Medicacion_Actual.update(updateMedicacionActualDto.toObject(_updateMedicacionActual), {
                where: {
                    id_Paciente_Medicacion_Actual: _updateMedicacionActual.id_Paciente_Medicacion_Actual,
                    id_Paciente: _updateMedicacionActual.id_Paciente
                }
            })
            if(!actualizacion || actualizacion[0] <= 0) return [undefined, false]
            return [undefined, true]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarMedicacionActual","MedicacionACtualService","58",error as string)
            return [error as string, undefined]
        }
    }
    public static async eliminarMedicacionActual(id_Paciente_Medicacion_Actual:number):Promise<[string?,boolean?]>{//todo:testear
        try {
            if(!id_Paciente_Medicacion_Actual || Number(id_Paciente_Medicacion_Actual) < 0) return ["id_Paciente_Medicacion_Actual es nulo o menor que 0", false]
            if(!this.buscarMedicacionActualPorId(id_Paciente_Medicacion_Actual).then(res=> res[1])) return ["No se encontro la medicacion actual por id registrada", false]
            const confirmacion = await Paciente_Medicacion_Actual.destroy({
                where: {
                    id_Paciente_Medicacion_Actual: id_Paciente_Medicacion_Actual
                }
            }) 
            if(!confirmacion || confirmacion < 0) return [undefined, false]
            return [undefined, true]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("eliminarMedicacionActual","MedicacionActualService","100",error as string)
            return [error as string, false]
        }
    }
}