import { Horarios_Turnos } from "../../data/models/Horarios_Turnos"
import { Turnos } from "../../data/models/Turnos";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";
import { TurnosService } from "./TurnosService";

export class HorariosTurnosServices{

    public static getHorariosTurnos = async(): Promise<[string?, Horarios_Turnos[]?]> => {//*TESTEADO, devuelve todos los horarios de turnos registrados
        try {
            
            const horariosEncontrados: Horarios_Turnos[] = await Horarios_Turnos.findAll();
            if(!horariosEncontrados || horariosEncontrados.length === 0){
                return ["No se encontraron horarios de turnos registrados", null];
            }
            return [undefined, horariosEncontrados]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getHorariosTurnos", "HorariosTurnosServices", "14", error as string);
            return ["Error al obtener los horarios de turnos", null];
        }
    }
    public static getHorarioTurnoById = async(id: number): Promise<[string?, Horarios_Turnos?]> => {//*TESTEADO, devuelve un horario del turno por su ID de la tabla de la base de datos
        try {
            if(!id || id <= 0){
                return ["ID de horario de turno invalido", null];
            }
            const horarioEncontrado: Horarios_Turnos  = await Horarios_Turnos.findByPk(id);
            if(!horarioEncontrado){
                return ["No se encontro el horario de turno con el ID proporcionado", null];
            }
            return [undefined, horarioEncontrado];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getHorarioTurnoById", "HorariosTurnosServices", "30", error as string);
            return ["Error al obtener el horario de turno", null];
        }
    }
    public static getHorarioTurnoByHora = async(hora: string): Promise<[string?, Horarios_Turnos?]> => { //* TESTEADO, devuelve un horario_turno de la base de datos, simplemente enviando la hora

        try {
            if(hora === undefined || hora === null || hora.trim() === ""){
                return ["Hora invalida", null];
            }
            if(!/^([01]\d|2[0-3]):([0-5]\d)$/.test(hora)){
                return ["Formato de hora invalido, debe ser HH:MM", null];
            }
            const horarioEncontrado: Horarios_Turnos = await Horarios_Turnos.findOne({
                where: {
                    hora: hora
                }
            });
            if(!horarioEncontrado){
                return ["No se encontro un horario de turno registrado en la base de datos con la hora proporcionada", null];
            }
            return [undefined, horarioEncontrado];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getHorarioTurnoByHora", "HorariosTurnosServices", "52", error as string);
            return ["Error al obtener el horario de turno", null];
        }
    }
    public static getHorariosDisponiblePorMedico = async ( fecha: string, id_Medico: number) => { //!CREAR y CARGAR SELECT DE VISTA CREAR TURNO POR API
        try {
            const [errorServicio,turnosPorMedico] = await TurnosService.getTurnosByMedicoId(id_Medico);
            if(errorServicio) return [errorServicio, undefined]
            const [errorServicioHorarios, horarios] = await this.getHorariosTurnos();
            if(errorServicioHorarios) return [errorServicioHorarios, undefined]
            const horariosFiltrados = []
            for(let horario of turnosPorMedico){//!FILTRAR EL ARREGLO BUSCAR METODO
                
            }

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getHorarioDisponible","HorariosTunosServices","57", error)
            return ["error al obtener los horarios Disponibles", undefined]
        }
    }

}