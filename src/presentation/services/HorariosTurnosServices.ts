import { horarios_Turnos } from "../../data/models/horarios_Turnos"
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";

export class HorariosTurnosServices{

    public static getHorariosTurnos = async(): Promise<[string?, horarios_Turnos[]?]> => {
        try {
            
            const horariosEncontrados: horarios_Turnos[] = await horarios_Turnos.findAll();
            if(!horariosEncontrados || horariosEncontrados.length === 0){
                return ["No se encontraron horarios de turnos registrados", null];
            }
            return [undefined, horariosEncontrados]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getHorariosTurnos", "HorariosTurnosServices", "14", error as string);
            return ["Error al obtener los horarios de turnos", null];
        }
    }
    public static getHorarioTurnoById = async(id: number): Promise<[string?, horarios_Turnos?]> => {
        try {
            if(!id || id <= 0){
                return ["ID de horario de turno invalido", null];
            }
            const horarioEncontrado: horarios_Turnos  = await horarios_Turnos.findByPk(id);
            if(!horarioEncontrado){
                return ["No se encontro el horario de turno con el ID proporcionado", null];
            }
            return [undefined, horarioEncontrado];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getHorarioTurnoById", "HorariosTurnosServices", "30", error as string);
            return ["Error al obtener el horario de turno", null];
        }
    }
    public static getHorarioTurnoByHora = async(hora: string): Promise<[string?, horarios_Turnos?]> => {

        try {
            if(hora === undefined || hora === null || hora.trim() === ""){
                return ["Hora invalida", null];
            }
            if(!/^([01]\d|2[0-3]):([0-5]\d)$/.test(hora)){
                return ["Formato de hora invalido, debe ser HH:MM", null];
            }
            const horarioEncontrado: horarios_Turnos = await horarios_Turnos.findOne({
                where: {
                    hora: hora
                }
            });
            if(!horarioEncontrado){
                return ["No se encontro un horario de turno registrado con la hora proporcionada", null];
            }
            return [undefined, horarioEncontrado];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getHorarioTurnoByHora", "HorariosTurnosServices", "52", error as string);
            return ["Error al obtener el horario de turno", null];
        }
    }

}