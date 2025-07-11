import { HelperForCreateErrors } from "../../../../../Helpers/HelperForCreateErrors"


export class updateRecetaMedicamentoDto{
    
    private constructor(
        public id_Recetas_Medicamentos: number,
        public id_Receta: number,
        public id_Medicamento: number,
        public indicacion:string
    ){}
    public static toObject(_updateRecetaMedicamentoDto:updateRecetaMedicamentoDto):{
        id_Recetas_Medicamentos: number,
        id_Receta: number,
        id_Medicamento: number,
        indicacion:string
    }{
        return {
            id_Recetas_Medicamentos: _updateRecetaMedicamentoDto.id_Recetas_Medicamentos,
            id_Receta: _updateRecetaMedicamentoDto.id_Receta,
            id_Medicamento: _updateRecetaMedicamentoDto.id_Medicamento,
            indicacion: _updateRecetaMedicamentoDto.indicacion
        }
    }
    public static create(object:{[key:string]:any}):[string?,updateRecetaMedicamentoDto?]{
        try {
            if(!object.id_Recetas_Medicamentos || Number(object.id_Recetas_Medicamentos) < 0) return ["El id_Recetas_Medicamentos es nulo o menor que 0"]
            if(!object.id_Receta || Number(object.id_Receta) < 0) return ["El id_Receta es nulo o menor que 0"]
            if(!object.id_Medicamento || Number(object.id_Medicamento) < 0) return ["El id_Medicamento es nulo o menor que 0"]
            if(!object.indicacion || object.indicacion.length < 10) return ["El indicacion es menor que 10 o es requerido"]
            return [undefined, new updateRecetaMedicamentoDto(
                Number(object.id_Recetas_Medicamentos),
                Number(object.id_Receta),
                Number(object.id_Medicamento),
                object.indicacion
            )] 
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("create","updateRecetaMedicamentoDto","40",error as string)
            return [error as string, undefined]
        }
    }
}