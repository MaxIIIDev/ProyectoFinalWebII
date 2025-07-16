

export class updateEvaluacionFisicaDto{

    private constructor(
        public id_Evaluacion_fisica: number,
       
        public presion_arterial_sistolica: number,
        public presion_arterial_diastolica: number,
        public frecuencia_cardiaca: number,
        public color_de_piel: string,
        public respuesta_a_estimulos: string,
        public id_Paciente: number,
        public id_Enfermero: number,
        public id_Admision: number
    ){}

    static toObject(object: {[key:string]:any}){
        return {
            id_Evaluacion_fisica: object.id_Evaluacion_fisica,
            presion_arterial_sistolica: object.presion_arterial_sistolica,
            presion_arterial_diastolica: object.presion_arterial_diastolica,
            frecuencia_cardiaca: object.frecuencia_cardiaca,
            color_de_piel: object.color_de_piel,
            respuesta_a_estimulos: object.respuesta_a_estimulos,
            id_Paciente: object.id_Paciente,
            id_Enfermero: object.id_Enfermero,
            id_Admision: object.id_Admision
        }
    }

    static create(object: {[key:string]:any}): [string? , updateEvaluacionFisicaDto?]{
        if(!object.id_Evaluacion_fisica || object.id_Evaluacion_fisica < 0) return ["El id de la evaluacion fisica es requerido y debe ser mayor o igual a 0", undefined];
        if(!object.presion_arterial_sistolica || object.presion_arterial_sistolica < 0 || object.presion_arterial_sistolica > 300) return ["La presion arterial sistolica es requerida y debe ser mayor o igual a 0 y menor o igual a 300", undefined];
        if(!object.presion_arterial_diastolica || object.presion_arterial_diastolica < 0 || object.presion_arterial_diastolica > 200) return ["La presion arterial diastolica es requerida y debe ser mayor o igual a 0 y menor o igual a 200", undefined];
        if(!object.frecuencia_cardiaca || object.frecuencia_cardiaca < 0 || object.frecuencia_cardiaca > 400) return ["La frecuencia cardiaca es requerida y debe ser mayor o igual a 0 y menor o igual a 400", undefined];
        if(!object.color_de_piel || object.color_de_piel.trim().length < 5) return ["El color de la piel es requerido y debe tener al menos 5 caracteres", undefined];
        if(!object.respuesta_a_estimulos || object.respuesta_a_estimulos.trim().length < 5) return ["La respuesta a estimulos es requerida y debe tener al menos 5 caracteres", undefined];
        if(!object.id_Paciente || object.id_Paciente < 0) return ["El id del paciente es requerido y debe ser mayor o igual a 0", undefined];
        if(!object.id_Enfermero || object.id_Enfermero < 0) return ["El id del enfermero es requerido y debe ser mayor o igual a 0", undefined];
        if(!object.id_Admision || object.id_Admision < 0) return ["El id de la admision es requerido y debe ser mayor o igual a 0", undefined];
        return [undefined, new updateEvaluacionFisicaDto(
            Number(object.id_Evaluacion_fisica),
            Number(object.presion_arterial_sistolica),
            Number(object.presion_arterial_diastolica),
            Number(object.frecuencia_cardiaca),
            object.color_de_piel,
            object.respuesta_a_estimulos,
            Number(object.id_Paciente),
            Number(object.id_Enfermero),
            Number(object.id_Admision)
        )]
    }
}
