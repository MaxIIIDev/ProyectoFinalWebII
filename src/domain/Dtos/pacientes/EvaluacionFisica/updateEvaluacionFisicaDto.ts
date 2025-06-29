

export class updateEvaluacionFisicaDto{

    private constructor(
        public id_Evaluacion_fisica: number,
        public fecha: string,
        public presion_arterial: number,
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
            fecha: object.fecha,
            presion_arterial: object.presion_arterial,
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
        if(!object.fecha) return ["La fecha es requerida", undefined];
        if(!object.presion_arterial || object.presion_arterial < 0) return ["La presion arterial es requerida y debe ser mayor o igual a 0", undefined];
        if(!object.frecuencia_cardiaca || object.frecuencia_cardiaca < 0) return ["La frecuencia cardiaca es requerida y debe ser mayor o igual a 0", undefined];
        if(!object.id_Paciente || object.id_Paciente < 0) return ["El id del paciente es requerido y debe ser mayor o igual a 0", undefined];
        if(!object.id_Enfermero || object.id_Enfermero < 0) return ["El id del enfermero es requerido y debe ser mayor o igual a 0", undefined];
        if(!object.id_Admision || object.id_Admision < 0) return ["El id de la admision es requerido y debe ser mayor o igual a 0", undefined];
        const fechaParseada = new Date(object.fecha).toISOString().split('T')[0];
        if(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(fechaParseada) === false) return ["Fecha invalida, debe ser en formato año-mes-dia"]
        return [undefined, new updateEvaluacionFisicaDto(
            Number(object.id_Evaluacion_fisica),
            fechaParseada,
            Number(object.presion_arterial),
            Number(object.frecuencia_cardiaca),
            object.color_de_piel,
            object.respuesta_a_estimulos,
            Number(object.id_Paciente),
            Number(object.id_Enfermero),
            Number(object.id_Admision)
        )]
    }
}
