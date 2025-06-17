import { Turnos } from "../../data/models/Turnos"
import { CrearTurnoDto } from "../../domain/Dtos/Turnos/createTurnoDTO";
import { updateTurnoDto } from "../../domain/Dtos/Turnos/updateTurnoDto";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";
import { MedicoService } from "./MedicoService";
import { PacienteServices } from "./PacientesService";

export class TurnosService {

    public static getTurnoById = async(id_turno: number): Promise<[string?, Turnos?]> => {//todo: Testear

        try {
            if(!id_turno || id_turno <= 0){
                return ["ID de turno invalido", null]
            }
            const turnoEncontrado = await Turnos.findOne({
                where: {
                    id_turno: id_turno
                }
            })
            if(!turnoEncontrado){
                return ["Turno no encontrado", null]
            }
            return [undefined, turnoEncontrado];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getTurnoById", "TurnosServices", "10", error);
            return ["Error al buscar el turno", null]
        }

    }

    public static  getAllTurnosByDate = async( fecha: string ): Promise<[string?, Turnos[]?]> => { //Devuelve los turnos por fecha especifica año-mes-dia
        try {
            if(!fecha || fecha.length !== 10){
                return ["Fecha invalida, debe ser en formato año-mes-dia", null]
            }
            const turnosEncontrados = await Turnos.findAll({
                where:{
                    fecha: fecha
                }
            })
            if(!turnosEncontrados || turnosEncontrados.length === 0){
                return ["No se encontraron turnos para el dia de hoy", null]
            }
            return [undefined, turnosEncontrados];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getAllTurnosInDay", "TurnosServices", "18", error);
            return ["Error al buscar los turnos", null]
        }
    }
    public static getTurnosByPacienteId = async(id_Paciente: number, _estado: boolean): Promise<[string?, Turnos[]?]> => {//todo: Testear
        try {
            
            if(!id_Paciente || id_Paciente <= 0){
                return ["ID de paciente invalido", null]
            }
            const turnosEncontrados = await Turnos.findAll({
                where:{
                    id_Paciente: id_Paciente,
                    estado: _estado
                }
            })
            if(!turnosEncontrados || turnosEncontrados.length === 0){
                return [`No se encontraron turnos ${(_estado ? "activos" : "inactivos")} para el paciente`, null]
            }
            return [undefined, turnosEncontrados];

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getTurnosByPacienteId", "TurnosServices", "28", error);
            return ["Error al buscar los turnos del paciente", null]
        }
    }
    public static getTurnosByMedicoId = async(id_Medico: number): Promise<[string?, Turnos[]?]> => {//todo: Testear
        try {
            if(!id_Medico || id_Medico <= 0){
                return ["ID de medico invalido", null]
            }
            const turnosEncontrados = await Turnos.findAll({
                where:{
                    id_Medico: id_Medico
                }
            })
            if(!turnosEncontrados || turnosEncontrados.length === 0){
                return ["No se encontraron turnos para el medico", null]
            }
            return [undefined, turnosEncontrados];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getTurnosByMedicoId", "TurnosServices", "30", error);
            return ["Error al buscar los turnos del medico", null]
        }
    }
    public static createTurno = async(crearTurnoDto: CrearTurnoDto): Promise<[string?, Turnos?]> => {//todo: Testear

        try {
            if(await MedicoService.getMedicoById(crearTurnoDto.id_Medico).then(res => res[0])){
                return ["Medico no encontrado", null]
            }
            if(await PacienteServices.buscarPacienteDesconocido(crearTurnoDto.id_Paciente).then(res => res[0] == false)){
                return ["Paciente no encontrado", null]
            }
            const turnoCreado = await Turnos.create(CrearTurnoDto.toObject(crearTurnoDto));
            if(!turnoCreado){
                return ["Error al crear el turno", null]
            }
            return [undefined, turnoCreado];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("createTurno", "TurnosServices", "45", error);
            return ["Error al crear el turno", null]
        }
    }
    public static updateTurno = async(_updateTurnoDto: updateTurnoDto): Promise<[string?, boolean?]> => {//todo: Testear
    
        try {
            if( await this.getTurnoById(_updateTurnoDto.id_turno).then(res => res[0])){
                return ["Turno no encontrado", null]
            }
            if(await MedicoService.getMedicoById(_updateTurnoDto.id_Medico).then(res => res[0])){
                return ["Medico no encontrado", null]
            }
            if(await PacienteServices.buscarPacienteDesconocido(_updateTurnoDto.id_Paciente).then(res => res[0] == false)){
                return ["Paciente no encontrado", null]
            }
            const [cantidadFilasActualizadas] = await Turnos.update(_updateTurnoDto, {
                where: {
                    id_turno: _updateTurnoDto.id_turno
                }
            });
            if(!cantidadFilasActualizadas || cantidadFilasActualizadas === 0){ 
                return ["Error al actualizar el turno", false];
            }
            return [undefined, true];
        }catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("updateTurno", "TurnosServices", "60", error);
            return ["Error al actualizar el turno", false];
        }
    }

}
