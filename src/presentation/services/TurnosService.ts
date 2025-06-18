import { Turnos } from "../../data/models/Turnos"
import { CrearTurnoDto } from "../../domain/Dtos/Turnos/createTurnoDTO";
import { updateTurnoDto } from "../../domain/Dtos/Turnos/updateTurnoDto";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";
import { HorariosTurnosServices } from "./HorariosTurnosServices";
import { MedicoService } from "./MedicoService";
import { PacienteServices } from "./PacientesService";

export class TurnosService {

    public static getTurnoById = async(id_turno: number): Promise<[string?, Turnos?]> => {//*TESTEADO

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

    public static  getAllTurnosByDate = async( fecha: string ): Promise<[string?, Turnos[]?]> => { //*TESTEADO //Devuelve los turnos por fecha especifica año-mes-dia
        try {
            if(!fecha || fecha.length !== 10 || /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(fecha) === false){
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
    public static getTurnoByDateAndHour = async(fecha: string, hora: string ): Promise<[string?,Turnos?]>=> { //*TESTEADO //Devuelve un turno por fecha y hora

        try {
            if(!fecha || fecha.length !== 10 || /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(fecha) === false){
                return ["Fecha invalida, debe ser en formato año-mes-dia", null]
            }
           
            if(!/^([01]\d|2[0-3]):([0-5]\d)$/.test(hora)){
                return ["Formato de hora invalido, debe ser HH:MM", null];
            }
            const horarioTurno = await HorariosTurnosServices.getHorarioTurnoByHora(hora).then(res => res[1]);
            if(!horarioTurno){
                return ["Horario de turno no encontrado", null]
            }
            const turnoEncontrado = await Turnos.findOne({
                where:{
                    fecha: fecha,
                    id_horario_turno: horarioTurno.dataValues.id_horario_turno
                }
            })
            if(!turnoEncontrado){
                return ["No se encontro un turno para la fecha y hora especificada", null]
            }
            return [undefined, turnoEncontrado];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getTurnoByDateAndHour", "TurnosServices", "75", error);
            return ["Error al buscar el turno por fecha y hora", null]
        }
    }
    public static getTurnosByPacienteId = async(id_Paciente: number, _estado: boolean): Promise<[string?, Turnos[]?]> => {//* TESTEADO // Devuelve los turnos por paciente, tiene dos modos, "true" para turnos activos y "false" para turnos inactivos.
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
    public static getTurnoByDateAndIdHorario = async(fecha: string, id_horario_turno: number): Promise<[string?, Turnos[]?]> => {//* TESTEADO // Devuelve un turno por fecha y por el id_horario_turno registrado en la base de datos
        try {
            if(!fecha || fecha.length !== 10 || /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(fecha) === false){
                return ["Fecha invalida, debe ser en formato año-mes-dia", null]
            }
               
            if(!id_horario_turno || id_horario_turno <= 0){
                return ["ID de horario de turno invalido", null]
            }
            const turnosEncontrados = await Turnos.findAll({
                where:{
                    fecha: fecha,
                    id_horario_turno: id_horario_turno
                }
            })
            if(!turnosEncontrados || turnosEncontrados.length === 0){
                return ["No se encontró un turno registrado en la fecha y horario especificado", null]
            }
            return [undefined, turnosEncontrados];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getTurnoByDateAndIdHorario", "TurnosServices", "102", error);
            return ["Error al buscar los turnos por fecha y horario", null]
        }
    }
    public static getTurnosByMedicoId = async(id_Medico: number): Promise<[string?, Turnos[]?]> => {//*TESTEADO // DEVUELVE los turnos por el id del medico
        try {
            if(!id_Medico || id_Medico <= 0){
                return ["ID de medico invalido", null]
            }
            if( await MedicoService.getMedicoById(id_Medico).then(res => res[0])){
                return ["Medico no encontrado", null]
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
            if(await PacienteServices.getPacienteById(crearTurnoDto.id_Paciente).then(res => res[0])){ 
                return ["Paciente no encontrado", null]
            }
            if(await this.getTurnoByDateAndIdHorario(crearTurnoDto.fecha, crearTurnoDto.id_horario_turno).then(res => res[1])){
                return ["Ya existe un turno para la fecha y horario especificados", null]
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
            if(await PacienteServices.getPacienteById(_updateTurnoDto.id_Paciente).then(res => res[0])){
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
    public static deleteTurno = async(id_turno: number, id_Paciente: number): Promise<[string?, boolean?]> => {

        try {
            if(!id_turno || id_turno <= 0){
                return ["ID de turno invalido", false];
            }
            if(!id_Paciente || id_Paciente <= 0){
                return ["ID de paciente invalido", false];
            }
            const turnoEncontrado = await this.getTurnoById(id_turno);
            if(turnoEncontrado[0]){
                return [turnoEncontrado[0], false];
            }
            const pacienteEncontrado = await PacienteServices.getPacienteById(id_Paciente);
            if(pacienteEncontrado[0]){
                return [pacienteEncontrado[0], false];
            }
            const cantidadFilasEliminadas = await Turnos.destroy({
                where: {
                    id_turno: id_turno,
                    id_Paciente: id_Paciente
                }
            });
            if(cantidadFilasEliminadas === 0){
                return ["No se pudo eliminar el turno, verifique los datos", false];
            }
            return [undefined, true];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("deleteTurno", "TurnosServices", "80", error);
            return ["Error al eliminar el turno", false];
        }
    }

}
